import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';


import { FormsModule } from '@angular/forms';
import { FilterTablePipe } from '../util/pipe/filter-table.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceComponent } from './service/service.component';
import { PackageComponent } from './package/package.component';
import { SuscriptionComponent } from './suscription/suscription.component';
import { TechnicianComponent } from './technician/technician.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BankComponent } from './bank/bank.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    HomeComponent,
    ClientComponent,
    FilterTablePipe,
    ServiceComponent,
    PackageComponent,
    SuscriptionComponent,
    TechnicianComponent,
    BankComponent,
    InvoiceComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    ToastrModule.forRoot()
  ]
})
export class PagesModule { }
