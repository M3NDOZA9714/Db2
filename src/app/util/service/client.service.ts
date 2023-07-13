import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { client } from '../interface/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getCliente = () => {
    return this.http.get<client[]>(`${environment.baseUrlApi}client/getCliente`);
  }
}
