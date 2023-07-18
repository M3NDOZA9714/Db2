import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { response } from '../interface/global.interface';
import { service } from '../interface/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getServicio = () => {
    return this.http.get<service[]>(`${environment.baseUrlApi}service/getServicio`);
  }

  insertServicio = (nombre: string, descripcion: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}service/insertServicio`, { nombre, descripcion });
  }

  updateServicio = (id: number, nombre: string, descripcion: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}service/updateServicio`, { id, nombre, descripcion });
  }
}
