import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { response } from '../interface/global.interface';
import { technician } from '../interface/technician.interface';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient) { }

  getTecnico = () => {
    return this.http.get<technician[]>(`${environment.baseUrlApi}technician/getTecnico`);
  }

  insertTecnico = (nombre: string, identidad: string, correo: string, telefono: string, direccion: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}technician/insertTecnico`, { nombre, identidad, correo, telefono, direccion });
  }

  updateTecnico = (id: number, nombre: string, identidad: string, correo: string, telefono: string, direccion: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}technician/updateTecnico`, { id, nombre, identidad, correo, telefono, direccion });
  }

  deleteTecnico = (id: number) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}technician/deleteTecnico`, { id });
  }

  payTecnico = (idBando: number | null, idTecnico: number, monto: number | null) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}technician/payTecnico`, { idBando, idTecnico, monto });
  }
}
