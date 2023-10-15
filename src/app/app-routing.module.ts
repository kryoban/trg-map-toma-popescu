import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { MapComponent } from './routes/map/map.component';

const routes: Routes = [
  { title: 'Map', path: 'map', loadComponent: () => MapComponent },
  {
    title: 'Dashboard',
    path: 'dashboard',
    loadComponent: () => DashboardComponent,
  },
  { path: '', redirectTo: 'map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
