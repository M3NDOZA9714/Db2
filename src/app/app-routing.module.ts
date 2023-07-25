import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './template/main/main.component';
import { ClientComponent } from './pages/client/client.component';
import { ServiceComponent } from './pages/service/service.component';
import { PackageComponent } from './pages/package/package.component';
import { SuscriptionComponent } from './pages/suscription/suscription.component';
import { TechnicianComponent } from './pages/technician/technician.component';
import { BankComponent } from './pages/bank/bank.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'client', component: ClientComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'package', component: PackageComponent },
      { path: 'suscription', component: SuscriptionComponent },
      { path: 'technician', component: TechnicianComponent },
      { path: 'bank', component: BankComponent },
      { path: 'invoice', component: InvoiceComponent }
    ]
  },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
