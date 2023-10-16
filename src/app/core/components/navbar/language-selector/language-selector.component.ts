import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../../../app-routing.module';
import { LanguageService } from '../../../services/language.service';
import { LanguageListItem, Languages } from '../../../../shared/models';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MatDividerModule } from '@angular/material/divider';

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
  dataToggleLabel = this.localStorageService.getData('largeDataset')
    ? 'Less data'
    : 'More data';

  constructor(
    private ls: LanguageService,
    private localStorageService: LocalStorageService
  ) {}

  onLocaleClick(localeCode: string): void {
    this.ls.changeLanguage(localeCode as Languages);
  }

  /**
   * "Hack" to easily toggle between the small and large dataset so that whoever's reviewing this code doesn't have to modify
   * it in order to switch between the two. Since it's a hack, I chose not to translate this text. :)
   *
   * The small dataset has the marker clusters disabled (added a check in location.service which disables marker clusters when
   * the locations number exceeds the arbitrary value of 500) so it's easier to review the basic map / dashboard functionalies.
   *
   * The large dataset (50k rows) will display the marker clusters as the browser would otherwise be in severe pain. :3
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
