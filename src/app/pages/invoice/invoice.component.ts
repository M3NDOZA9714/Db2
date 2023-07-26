import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { bank } from 'src/app/util/interface/bank.interface';
import { client } from 'src/app/util/interface/client.interface';
import { invoice, invoiceDetail, invoiceDetailFilters, invoiceFilters, servicioFactura, servicioFacturaFilters } from 'src/app/util/interface/invoice.interface';
import { BankService } from 'src/app/util/service/bank.service';
import { ClientService } from 'src/app/util/service/client.service';
import { GlobalService } from 'src/app/util/service/global.service';
import { InvoiceService } from 'src/app/util/service/invoice.service';
declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('firstModal') myModal: any;
  @ViewChild('secondModal') mySecondModal: any;

  invoice: invoice[] = [];
  invoiceDetail: invoiceDetail[] = [];
  client: client[] = [];
  servicioFactura: servicioFactura[] = [];
  banco: bank[] = [];
  idBanco!: number | null;
  monto!: number | null;

  invoiceFilters: invoiceFilters = {
    Fecha: "", NombreCliente: "", Estado: "", Tipo: "", Subtotal: "", Impuesto: "", Total: ""
  }

  invoiceDetailDilter: invoiceDetailFilters = {
    Nombre: "", Tipo: "", Cantidad: "", Precio: "", Impuesto: ""
  }

  servicioFacturaFilters: servicioFacturaFilters = {
    Nombre: "", Tipo: "", Precio: ""
  }

  selectedInvoice: Set<invoice> = new Set();
  selectedInvoiceDetail: Set<invoiceDetail> = new Set();
  selectedServicioFactura: Set<servicioFactura> = new Set();
  selectedEditingRow: Set<invoiceDetail> = new Set();

  id: number = 0;
  idCliente!: number | null;
  tipo!: string | null;

  totalInvoiceDetail: number = 0;
  totalItems: number = 0;
  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sInvoice: InvoiceService, private sGlobal: GlobalService, private sClient: ClientService, private sBank: BankService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFactura();
    this.getClient();
    this.getBanco();
  }

  ngAfterViewInit() {
    $(this.mySecondModal.nativeElement).on('hidden.bs.modal', () => {
      $(this.myModal.nativeElement).modal('show');
    });
  }

  getFactura = () => {
    this.sInvoice.getFactura().subscribe(rs => {
      this.invoice = rs;
    })
  }

  getBanco = () => {
    this.sBank.getBanco().subscribe(rs => {
      this.banco = rs;
    })
  }

  getServicioFactura = () => {
    this.sInvoice.getServicioFactura(this.idCliente).subscribe(rs => {
      this.servicioFactura = rs;
    })
  }

  getFacturaDetalle = (idFactura: number) => {
    this.sInvoice.getFacturaDetalle(idFactura).subscribe(rs => {
      this.invoiceDetail = rs;
    })
  }

  getClient = () => {
    this.sClient.getCliente().subscribe(rs => {
      this.client = rs;
    })
  }

  loadInvoice = () => {
    const { Id, IdCliente, Tipo } = Array.from(this.selectedInvoice.values())[0];
    this.getFacturaDetalle(this.id);
    this.setParams(Id, IdCliente, Tipo, this.invoiceDetail);
  }

  filterTable = (arr: any[], filters: any, size: number): any[] => {
    const result: { newArr: any[], lengthArr: number } = this.sGlobal.filterTable(arr, filters);
    size = result.lengthArr;

    return result.newArr;
  }


  pageChanged = (e: any) => {
    this.pageNumber = 1;
  }

  valLine = (set: Set<any>, row: any) => {
    return set.has(row);
  }

  addLine = (set: Set<any>, row: any) => {
    this.sGlobal.addLine(set, row);
  }

  addEditingRow = (row: any) => {
    if (this.selectedEditingRow.has(row)) {
      return
    } else {
      this.selectedEditingRow.clear();
      this.selectedEditingRow.add(row);
    }
  }

  selectAll = (arr: any, filters: any, set: Set<any>, size: number) => {
    const newArr = this.filterTable(arr, filters, size)
    this.sGlobal.selectAll(newArr, set);
  }

  insertFactura = () => {
    this.sInvoice.insertFactura(this.idCliente, this.tipo, this.invoiceDetail).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getFactura();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  updateFactura = () => {
    this.sInvoice.updateFactura(this.id, this.idCliente, this.tipo, this.invoiceDetail).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.selectedInvoice.clear();
        this.getFactura();
        this.selectedEditingRow.clear();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  loadPayFactura = (row: any) => {
    this.id = row.Id;
  }

  payFactura = () => {
    this.sInvoice.payFactura(this.idBanco, this.monto, this.id).subscribe(rs => {
      if (rs[0].statusCode == 200) {
        this.toastr.success(rs[0].message);
        this.getFactura();
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  setParams = (id: number, idCliente: number | null, tipo: string | null, invoiceDetail: invoiceDetail[]) => {
    this.id = id;
    this.idCliente = idCliente;
    this.tipo = tipo;
    this.invoiceDetail = invoiceDetail;
  }

  addItemToInvoice = () => {
    const arr = Array.from(this.selectedServicioFactura)

    var el: invoiceDetail[] = [];

    arr.map((row) => {
      var cont = 0;
      this.invoiceDetail.map(element => {
        if (row.Id == element.Id) {
          cont++;
        }
      })
      if (!cont) {
        el.push({
          Id: 0,
          IdArticulo: row.Id,
          Nombre: row.Nombre,
          Tipo: row.Tipo,
          Cantidad: 1,
          Precio: row.Precio,
          Impuesto: 0.15
        })
      }
    })

    if (el.length) {
      this.invoiceDetail = this.invoiceDetail.concat(el);
      this.selectedServicioFactura.clear();
      this.toastr.success("Se han agragado las líneas");
    } else {
      this.toastr.warning("No se agregó ninguna línea");
    }
  }

  removeLine = () => {
    this.invoiceDetail = this.invoiceDetail.filter(row => {
      return !this.selectedInvoiceDetail.has(row);
    })
    this.selectedInvoiceDetail.clear();
  }

  kPressInput = (e: any) => {
    if (e.key == "Enter" || e.key == "Escape") {
      this.selectedEditingRow.clear();
    }
  }
}
