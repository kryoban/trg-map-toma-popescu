import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Location, NestedDictionary } from '../../../shared/models';
import { LocationService } from '../../../core/services/location.service';
import { Observable, map } from 'rxjs';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit {
  locationForm: FormGroup = this.fb.group({
    name: [this.data.name, Validators.required],
    address: [this.data.address, Validators.required],
    lat: [
      this.data.lat,
      [Validators.required, Validators.min(-90), Validators.max(90)],
    ],
    lng: [
      this.data.lng,
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
  });

  tr$!: Observable<NestedDictionary<string>>;

  constructor(
    public dialogRef: MatDialogRef<LocationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Location,
    private fb: FormBuilder,
    private ls: LanguageService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.tr$ = this.ls.getTranslationsForSelectedLanguage().pipe(
      map((translation) => {
        const { locationDetails, locationModal } = translation;
        return {
          ...(locationDetails as Record<string, string>),
          ...(locationModal as Record<string, string>),
        };
      })
    );
  }

  onSubmitClick(): void {
    if (!this.locationForm.valid) {
      this.locationForm.markAllAsTouched();
      this.locationForm.updateValueAndValidity();
      return;
    }

    if (this.data.id) {
      this.locationService.editLocation({
        ...this.data,
        ...this.locationForm.value,
      });
    } else {
      this.locationService.addLocation(this.locationForm.value);
    }
    this.dialogRef.close({ updateData: true });
  }

  onCancelClick(): void {
    this.dialogRef.close({ updateData: false });
  }

  isControlInvalid(formControlName: string): boolean {
    const fc = this.locationForm.get(formControlName);
    return !!(fc?.invalid && fc?.errors && (fc?.dirty || fc?.touched));
  }
}
