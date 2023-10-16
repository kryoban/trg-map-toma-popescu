import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { LocationService } from '../../../core/services/location.service';
import {
  iconDefault,
  iconRed,
  mapCenter,
  maxBounds,
} from '../../../shared/utils/map-helpers';
import { Location } from '../../../shared/models';

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapRef!: ElementRef;

  @Output() markerClick: EventEmitter<Location> = new EventEmitter();
  @Output() mapClick: EventEmitter<void> = new EventEmitter();

  private map!: L.Map;
  private selectedMarker!: L.Marker | null;

  constructor(private locationService: LocationService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkersToMap();
  }

  private initMap(): void {
    this.map = L.map(this.mapRef.nativeElement, {
      center: mapCenter,
      zoom: 5,
      maxBounds,
    });

    this.map.addEventListener('click', () => {
      this.onMapClick();
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        noWrap: true,
      }
    );

    tiles.addTo(this.map);
  }

  private addMarkersToMap(): void {
    this.locationService.getLocations().subscribe((locations) => {
      if (locations.length > 500) {
        return this.createMarkerClusters(locations);
      }
      this.createMarkers(locations);
    });
  }

  private createMarkerClusters(locations: Location[]): void {
    const markers = L.markerClusterGroup();
    locations.forEach((location) => {
      const mapMarker = this.createMarker(location);
      markers.addLayer(mapMarker);
    });
    this.map.addLayer(markers);
  }

  private createMarkers(locations: Location[]): void {
    locations.forEach((location) => {
      const mapMarker = this.createMarker(location);
      mapMarker.addTo(this.map);
    });
  }

  private createMarker(location: Location): L.Marker {
    const { lat, lng } = location;
    const mapMarker = L.marker([parseFloat(lat), parseFloat(lng)]);

    mapMarker.bindPopup(this.onShowPopup(location));
    mapMarker.addEventListener('click', () =>
      this.onMarkerClick(mapMarker, location)
    );

    return mapMarker;
  }

  private onShowPopup(location: Location): string {
    return location.name;
  }

  private onMarkerClick(mapMarker: L.Marker, location: Location): void {
    this.clearSelectedMarker();

    mapMarker.setIcon(iconRed);
    this.selectedMarker = mapMarker;
    this.map.setView(this.selectedMarker.getLatLng());

    this.markerClick.emit(location);
  }

  private onMapClick(): void {
    this.clearSelectedMarker();
    this.mapClick.emit();
  }

  private clearSelectedMarker(): void {
    if (this.selectedMarker) {
      this.selectedMarker.setIcon(iconDefault);
      this.selectedMarker = null;
    }
  }
}
