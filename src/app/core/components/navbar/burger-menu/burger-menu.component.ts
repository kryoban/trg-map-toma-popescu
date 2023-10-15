import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, map } from 'rxjs';
import { NestedDictionary } from '../../../../shared/models';
import { LanguageService } from '../../../services/language.service';
import { AppRoutingModule } from '../../../../app-routing.module';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './burger-menu.component.html',
})
export class BurgerMenuComponent {
  tr$!: Observable<NestedDictionary<string>>;

  constructor(private ls: LanguageService) {}

  ngOnInit() {
    this.tr$ = this.ls
      .getTranslationsForSelectedLanguage()
      .pipe(map((lang) => lang['navbar'] as NestedDictionary<string>));
  }
}
