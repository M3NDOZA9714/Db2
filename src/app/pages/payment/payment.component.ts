import { Component, OnInit } from '@angular/core';
import { payment, paymentFilter } from 'src/app/util/interface/payment.interface';
import { GlobalService } from 'src/app/util/service/global.service';
import { PaymentService } from 'src/app/util/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {

  payment: payment[] = [];
  paymentFilter: paymentFilter = {
    Fecha: "", Factura: "", NombreBanco: "", CuentaBanco: "", Monto: "", Tipo: ""
  }

  pageNumber: number = 0;
  pageSize: number = 8;

  constructor(private sPayment: PaymentService, private sGlobal: GlobalService) { }

  ngOnInit(): void {
    this.getPago();
  }

  getPago = () => {
    this.sPayment.getPayment().subscribe(rs => {
      console.log(rs)
      this.payment = rs;
    })
  }

  filterTable = (): payment[] => {
    return this.sGlobal.filterTable(this.payment, this.paymentFilter);
  }

  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

}
