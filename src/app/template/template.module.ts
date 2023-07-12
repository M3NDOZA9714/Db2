import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { AsideComponent } from './aside/aside.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    HeadComponent,
    FooterComponent,
    MainComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class TemplateModule { }
