import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { client } from 'src/app/util/interface/client.interface';
import { invoice, invoiceDetail, invoiceFilters, servicioFactura, servicioFacturaFilters } from 'src/app/util/interface/invoice.interface';
import { ClientService } from 'src/app/util/service/client.service';
import { GlobalService } from 'src/app/util/service/global.service';
import { InvoiceService } from 'src/app/util/service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass']
})
export class InvoiceComponent implements OnInit {

  invoice: invoice[] = [];
  invoiceDetail: invoiceDetail[] = [];
  client: client[] = [];
  servicioFactura: servicioFactura[] = [];

  invoiceFilters: invoiceFilters = {
    Fecha: "", NombreCliente: "", Estado: "", Subtotal: "", Impuesto: "", Total: ""
  }

  servicioFacturaFilters: servicioFacturaFilters = {
    Nombre: "", Tipo: "", Precio: ""
  }

  selectedInvoice: Set<invoice> = new Set();
  selectedServicioFactura: Set<servicioFactura> = new Set();

  id: number = 0;
  idCliente!: number | null;
  tipo: string = "";

  totalItems: number = 0;
  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(private sInvoice: InvoiceService, private sGlobal: GlobalService, private sClient: ClientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFactura();
    this.getClient();
  }

  getFactura = () => {
    this.sInvoice.getFactura().subscribe(rs => {
      this.invoice = rs;
    })
  }

  getServicioFactura = () => {
    this.sInvoice.getServicioFactura().subscribe(rs => {
      this.servicioFactura = rs;
    })
  }

  getClient = () => {
    this.sClient.getCliente().subscribe(rs => {
      this.client = rs;
    })
  }

  filterTable = (arr: any[], filters: any): any[] => {
    const result: { newArr: any[], lengthArr: number } = this.sGlobal.filterTable(arr, filters);
    this.totalItems = result.lengthArr;

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

  selectAll = (arr: any, filters: any, set: Set<any>) => {
    const newArr = this.filterTable(arr, filters)
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
      } else {
        this.toastr.warning(rs[0].message);
      }
    })
  }

  setParams = (id: number) => {
    this.id = id;

  }

  // addItemToInvoice = () => {
  //   const arr = Array.from(this.selectedServicioFactura)

  //   var el: item[] = [];

  //   arr.map((row) => {
  //     var cont = 0;
  //     this.servicio.map(element => {
  //       if (row.Id == element.IdServicio) {
  //         cont++;
  //       }
  //     })
  //     if (!cont) {
  //       el.push({
  //         Id: 0,
  //         IdPaquete: 0,
  //         NombrePaquete: "",
  //         IdServicio: row.Id,
  //         NombreServicio: row.Nombre,
  //         DescripcionServicio: row.Descripcion
  //       })
  //     }
  //   })

  //   if (el.length) {
  //     this.servicio = this.servicio.concat(el);
  //     this.selectedServices.clear();
  //     this.toastr.success("Se han agragado las líneas");
  //   } else {
  //     this.toastr.warning("No se agregó ninguna línea");
  //   }
  // }
}
