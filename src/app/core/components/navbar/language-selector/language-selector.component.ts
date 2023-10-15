import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../../../app-routing.module';
import { LanguageService } from '../../../services/language.service';
import { LanguageListItem, Languages } from '../../../../shared/models';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [AppRoutingModule, CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  languagesList: LanguageListItem[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ro', label: 'Romana' },
  ];

  constructor(private ls: LanguageService) {}

  onLocaleClick(localeCode: string) {
    this.ls.changeLanguage(localeCode as Languages);
  }
}
