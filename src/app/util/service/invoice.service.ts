import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { response } from '../interface/global.interface';
import { paquete, servicio } from '../interface/package.interface';
import { invoice, invoiceDetail, servicioFactura } from '../interface/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getFactura = () => {
    return this.http.get<invoice[]>(`${environment.baseUrlApi}invoice/getFactura`);
  }

  getFacturaDetalle = (idFactura: number) => {
    return this.http.get<invoiceDetail[]>(`${environment.baseUrlApi}invoice/getFacturaDetalle?idFactura=${idFactura}`);
  }

  getServicioFactura = (idCliente: number | null) => {
    return this.http.get<servicioFactura[]>(`${environment.baseUrlApi}invoice/getServicioFactura?idCliente=${idCliente}`);
  }

  insertFactura = (idCliente: number | null, tipo: string | null, detalleFactura: invoiceDetail[]) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}invoice/insertFactura`, { idCliente, tipo, detalleFactura });
  }

  updateFactura = (id: number, idCliente: number | null, tipo: string | null, detalleFactura: invoiceDetail[]) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}invoice/updateFactura`, { id, idCliente, tipo, detalleFactura })
  }

  payFactura = (idBanco: number | null, monto: number | null, idFactura: number) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}invoice/payFactura`, { idBanco, monto, idFactura })
  }
}
