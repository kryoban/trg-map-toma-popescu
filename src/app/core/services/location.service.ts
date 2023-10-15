import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  APILocation,
  europeanCapitals,
  getListOfRandomLocations,
} from 'src/backend/data';
import { Location } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locations = europeanCapitals.map((location: APILocation) => {
    const { continentName, countryCode, countryName, ...rest } = location;
    return { ...rest, address: `${countryName} (${countryCode})` };
  });
  private locationsSubject: BehaviorSubject<Location[]> = new BehaviorSubject(
    this.locations
  );

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
