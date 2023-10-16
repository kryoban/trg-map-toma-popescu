import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '@core/services/language.service';
import { NestedDictionary } from '@shared/models';
import { Observable, map } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';

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
