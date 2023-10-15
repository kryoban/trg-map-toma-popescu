import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from '../../../core/services/language.service';
import { Observable, map } from 'rxjs';
import { NestedDictionary } from '../../../shared/models';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerListComponent implements OnInit {
  @Input() selectedLocation: any = null;

  tr$!: Observable<NestedDictionary<string>>;

  constructor(private ls: LanguageService) {}

  ngOnInit() {
    this.tr$ = this.ls
      .getTranslationsForSelectedLanguage()
      .pipe(map((lang) => lang['locationDetails'] as NestedDictionary<string>));
  }
}
