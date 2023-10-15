import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { LanguageService } from '../../services/language.service';
import { Observable, map } from 'rxjs';
import { NestedDictionary } from '../../../shared/models';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    AppRoutingModule,
    BurgerMenuComponent,
    CommonModule,
    LanguageSelectorComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class NavbarComponent implements OnInit {
  tr$!: Observable<NestedDictionary<string>>;

  constructor(private ls: LanguageService) {}

  ngOnInit() {
    this.tr$ = this.ls
      .getTranslationsForSelectedLanguage()
      .pipe(map((lang) => lang['navbar'] as NestedDictionary<string>));
  }
}
