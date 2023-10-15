import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
  locationDetails: any;

  onMarkerClick(location: any) {
    this.locationDetails = location;
    this.drawerRef.open();
  }

  onMapClick() {
    this.locationDetails = null;
    this.drawerRef.close();
  }
}
