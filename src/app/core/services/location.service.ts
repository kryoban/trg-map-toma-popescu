import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  APILocation,
  europeanCapitals,
  getListOfRandomLocations,
} from 'src/backend/data';
import { Location } from '../../shared/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locations;
  private locationsSubject!: BehaviorSubject<Location[]>;

  constructor(private localStorageService: LocalStorageService) {
    const dataSource = this.localStorageService.getData('largeDataset')
      ? getListOfRandomLocations(50_000)
      : europeanCapitals;

    this.locations = dataSource.map((location: APILocation) => {
      const { continentName, countryCode, countryName, ...rest } = location;
      return { ...rest, address: `${countryName} (${countryCode})` };
    });
    this.locationsSubject = new BehaviorSubject(this.locations);
  }

  getLocations(): Observable<Location[]> {
    return this.locationsSubject.asObservable();
  }

  addLocation(location: Omit<Location, 'id' | 'createdDate'>): void {
    const id = (this.locations.length + 1).toString();
    const createdDate = new Date().toISOString();

    this.locations = [{ ...location, id, createdDate }, ...this.locations];
    this.locationsSubject.next(this.locations);
  }

  editLocation(location: Location): void {
    this.locations = this.locations.map((loc) =>
      loc.id === location.id ? location : loc
    );
    this.locationsSubject.next(this.locations);
  }
}
