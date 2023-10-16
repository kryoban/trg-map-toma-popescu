import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Location } from '@shared/models';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { DrawerListComponent } from './location-details/location-details.component';

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
