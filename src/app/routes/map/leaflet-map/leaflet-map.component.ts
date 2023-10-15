import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  latLng,
  latLngBounds,
  map,
  Map,
  marker,
  Marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from '../../../core/services/location.service';
import { iconDefault, iconRed } from '../../../shared/utils/map-helpers';

Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapRef!: ElementRef;

  @Output() markerClick: EventEmitter<any> = new EventEmitter();
  @Output() mapClick: EventEmitter<void> = new EventEmitter();

  private map!: Map;
  private selectedMarker!: Marker | null;

  constructor(private locationService: LocationService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkersToMap();
  }

  private initMap(): void {
    this.map = map(this.mapRef.nativeElement, {
      center: [44.43333333333333, 26.1],
      zoom: 5,
      maxBounds: latLngBounds(latLng(-90, -180), latLng(90, 180)),
    });

    this.map.addEventListener('click', () => {
      this.onMapClick();
    });

    const tiles = tileLayer(
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
      locations.forEach((location) => {
        const { lat, lng } = location;
        const mapMarker = marker([parseFloat(lat), parseFloat(lng)]);

        mapMarker.bindPopup(this.onShowPopup(location));
        mapMarker.addEventListener('click', () =>
          this.onMarkerClick(mapMarker, location)
        );

        mapMarker.addTo(this.map);
      });
    });
  }

  private onShowPopup(location: any): string {
    return location.name;
  }

  private onMarkerClick(mapMarker: Marker, location: any): void {
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
