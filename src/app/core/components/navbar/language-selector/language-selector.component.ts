import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '@core/services/language.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { LanguageListItem, Languages } from '@shared/models';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    AppRoutingModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  languagesList: LanguageListItem[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ro', label: 'Romana' },
  ];
  // part of the "hack", please scroll down for more info
  dataToggleLabel = this.localStorageService.getData('largeDataset')
    ? 'Less data'
    : 'More data';

  constructor(
    private ls: LanguageService,
    private localStorageService: LocalStorageService
  ) {}

  onLanguageClick(languageCode: string): void {
    this.ls.changeLanguage(languageCode as Languages);
  }

  /**
   * "Hack" to easily toggle between the small and large dataset so that whoever's reviewing my work doesn't have to modify the
   * code in order to switch between the two. Since it's a hack, I chose not to translate this text. :)
   *
   * The small dataset has the marker clusters disabled (added a check in location.service which disables marker clusters when
   * the locations number exceeds the arbitrary value of 500) so it's easier to review the basic map / dashboard functionalies.
   *
   * The large dataset (50k random rows) will display the marker clusters as the browser would otherwise be in severe pain. :3
   */
  onDataToggleClick(): void {
    const key = 'largeDataset';
    if (this.localStorageService.getData(key)) {
      this.localStorageService.removeData(key);
    } else {
      this.localStorageService.saveData(key, 'true');
    }
    window.location.reload();
  }
}
