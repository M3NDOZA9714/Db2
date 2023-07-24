import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { response } from '../interface/global.interface';
import { suscription } from '../interface/suscription.interface';


@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {

  constructor(private http: HttpClient) { }

  getSuscripcion = () => {
    return this.http.get<suscription[]>(`${environment.baseUrlApi}suscription/getSuscripcion`);
  }

  insertSuscripcion = (idPaquete: number | null, idCliente: number | null, idTecnico: number | null, horas: number, precio: number) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}suscription/insertSuscripcion`, { idPaquete, idCliente, idTecnico, horas, precio });
  }

  updateSuscripcion = (id: number | null, idPaquete: number | null, idCliente: number | null, idTecnico: number | null, horas: number, precio: number) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}suscription/updateSuscripcion`, { id, idPaquete, idCliente, idTecnico, horas, precio });
  }
}
