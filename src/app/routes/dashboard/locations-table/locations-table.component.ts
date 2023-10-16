import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LanguageService } from '@core/services/language.service';
import { Location, NestedDictionary } from '@shared/models';
import {
  customGetRangeLabel,
  filterByNameOrAddress,
  sortData,
  tableColumns,
} from '@shared/utils/table-helpers';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-locations-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss'],
})
export class LocationsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatInput) input!: MatInput;

  @Input() tableData!: Location[];
  @Output() editClick: EventEmitter<Location> = new EventEmitter();
  @Output() addClick: EventEmitter<void> = new EventEmitter();

  displayedColumns = tableColumns;
  dataSource!: MatTableDataSource<Location>;
  tr$!: Observable<NestedDictionary<string>>;
  isLoading = true;

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
    this.isLoading = false;
    this.paginator._intl.getRangeLabel = customGetRangeLabel;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewChecked(): void {
    if (this.dataSource.sort !== this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  onEditClick(rowData: Location): void {
    this.editClick.emit(rowData);
  }

  onAddClick(): void {
    this.addClick.emit();
  }

  tableTracker(_: number, item: Location): string {
    return `${item.id}`;
  }

  applyFilter(): void {
    this.dataSource.filter = this.input?.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateDataSource(data: Location[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortData = sortData();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = filterByNameOrAddress();
    this.applyFilter();
  }
}
