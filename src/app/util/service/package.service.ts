import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { response } from '../interface/global.interface';
import { paquete, servicio } from '../interface/package.interface';


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getPaquete = () => {
    return this.http.get<paquete[]>(`${environment.baseUrlApi}package/getPaquete`);
  }

  getServicioPaquete = (idPaquete: number) => {
    return this.http.get<servicio[]>(`${environment.baseUrlApi}package/getServicioPaquete?idPaquete=${idPaquete}`,);
  }

  insertPaquete = (nombre: string, descripcion: string, precio: number | null, servicio: servicio[]) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}package/insertPaquete`, { nombre, descripcion, precio, servicio });
  }

  updatePaquete = (id: number, nombre: string, descripcion: string, precio: number | null, servicio: servicio[]) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}package/updatePaquete`, { id, nombre, descripcion, precio, servicio });
  }

  deletePaquete = (id: number) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}package/deletePaquete`, { id });
  }
}
