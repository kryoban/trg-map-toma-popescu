import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from '@core/services/language.service';
import { Location, NestedDictionary } from '@shared/models';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerListComponent implements OnInit {
  @Input() selectedLocation: Location | null = null;

  tr$!: Observable<NestedDictionary<string>>;

  constructor(private ls: LanguageService) {}

  ngOnInit() {
    this.tr$ = this.ls
      .getTranslationsForSelectedLanguage()
      .pipe(map((lang) => lang['locationDetails'] as NestedDictionary<string>));
  }
}
