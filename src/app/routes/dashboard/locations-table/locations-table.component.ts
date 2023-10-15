import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Location, NestedDictionary } from '../../../shared/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map } from 'rxjs';
import { LanguageService } from '../../../core/services/language.service';
import { customGetRangeLabel } from '../../../shared/utils/table-helpers';

@Component({
  selector: 'app-locations-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableData!: Location[];
  @Output() editClick: EventEmitter<Location> = new EventEmitter();
  @Output() addClick: EventEmitter<void> = new EventEmitter();

  displayedColumns: string[] = [
    'name',
    'address',
    'lat',
    'lng',
    'createdDate',
    'edit',
  ];
  dataSource!: MatTableDataSource<Location>;
  tr$!: Observable<NestedDictionary<string>>;

  constructor(private ls: LanguageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tableData'].currentValue &&
      changes['tableData'].previousValue !== undefined
    ) {
      this.updateDataSource(changes['tableData'].currentValue);
    }
  }

  ngOnInit(): void {
    this.updateDataSource(this.tableData);
    this.tr$ = this.ls
      .getTranslationsForSelectedLanguage()
      .pipe(
        map(
          (translation) => translation['dashboard'] as NestedDictionary<string>
        )
      );
  }

  ngAfterViewInit(): void {
    this.paginator._intl.getRangeLabel = customGetRangeLabel;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEditClick(rowData: Location): void {
    this.editClick.emit(rowData);
  }

  onAddClick(): void {
    this.addClick.emit();
  }

  private updateDataSource(data: Location[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
