import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './template/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
