import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { DrawerListComponent } from './location-details/location-details.component';
import { Location } from '../../shared/models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    DrawerListComponent,
    LeafletMapComponent,
    MatSidenavModule,
  ],
  templateUrl: './map.component.html',
})
export class MapComponent {
  @ViewChild('drawer') drawerRef!: MatSidenav;
  locationDetails!: Location | null;

  onMarkerClick(location: Location): void {
    this.locationDetails = location;
    this.drawerRef.open();
  }

  onMapClick(): void {
    this.locationDetails = null;
    this.drawerRef.close();
  }
}
