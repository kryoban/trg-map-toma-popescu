import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../shared/models';
import { LocationService } from '../../core/services/location.service';
import { Observable } from 'rxjs';
import { LocationsTableComponent } from './locations-table/locations-table.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocationModalComponent } from './location-modal/location-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LocationsTableComponent, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
    this.tableData$ = this.locationService.getLocations();
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

    dialogRef.afterClosed().subscribe((result: { goToFirstPage: boolean }) => {
      console.log('The dialog was closed', result);
      if (result.goToFirstPage) {
        this.tableData$ = this.locationService.getLocations();
      }
    });
  }
}
