import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocationService } from '@core/services/location.service';
import { Location } from '@shared/models';
import { Observable, distinctUntilChanged } from 'rxjs';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { LocationsTableComponent } from './locations-table/locations-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LocationsTableComponent, MatDialogModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  tableData$!: Observable<Location[]>;
  constructor(
    private dialog: MatDialog,
    private locationService: LocationService
  ) {}

  private readonly emptyLocation: Location = {
    id: '',
    name: '',
    address: '',
    createdDate: '',
    lat: '',
    lng: '',
  };

  ngOnInit(): void {
    this.tableData$ = this.locationService
      .getLocations()
      .pipe(distinctUntilChanged());
  }

  onEditClick(location: Location): void {
    this.openDialog(location);
  }

  onAddClick(): void {
    this.openDialog(this.emptyLocation);
  }

  openDialog(location?: Location): void {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      data: location,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { updateData: boolean }): void => {
        if (result.updateData) {
          this.tableData$ = this.locationService.getLocations();
        }
      });
  }
}
