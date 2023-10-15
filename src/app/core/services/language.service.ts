import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as en from 'src/i18n/en.json';
import * as es from 'src/i18n/es.json';
import * as ro from 'src/i18n/ro.json';
import { Languages, NestedDictionary } from '../../shared/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageFile: NestedDictionary<string> = en;
  private languageSubject: BehaviorSubject<NestedDictionary<string>> =
    new BehaviorSubject(this.languageFile);

  constructor(private localStorageService: LocalStorageService) {
    const existingLanguageSetting = this.localStorageService.getData(
      'language'
    ) as Languages;
    this.languageFile = this.setLanguageFile(existingLanguageSetting);
    this.languageSubject.next(this.languageFile);
  }

  changeLanguage(language: Languages): void {
    this.languageFile = this.setLanguageFile(language);
    this.localStorageService.saveData('language', language);
    this.languageSubject.next(this.languageFile);
  }

  getTranslationsForSelectedLanguage(): Observable<NestedDictionary<string>> {
    return this.languageSubject.asObservable();
  }

  private setLanguageFile(language: Languages) {
    switch (language) {
      case Languages.ES:
        return es;
      case Languages.RO:
        return ro;
      default:
        return en;
    }
  }
}
