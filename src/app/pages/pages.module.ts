import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';

import { FormsModule } from '@angular/forms';
import { FilterTablePipe } from '../util/pipe/filter-table.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    ClientComponent,
    FilterTablePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class PagesModule { }
