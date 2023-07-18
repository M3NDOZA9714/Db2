import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { client } from '../interface/client.interface';
import { response } from '../interface/global.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getCliente = () => {
    return this.http.get<client[]>(`${environment.baseUrlApi}client/getCliente`);
  }

  insertCliente = (nombre: string, direccion: string, telefono: string, rtn: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}client/insertCliente`, { nombre, direccion, telefono, rtn });
  }

  updateCliente = (id: number, nombre: string, direccion: string, telefono: string, rtn: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}client/updateCliente`, { id, nombre, direccion, telefono, rtn });
  }

}
