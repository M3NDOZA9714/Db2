import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { response } from '../interface/global.interface';
import { bank } from '../interface/bank.interface';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getBanco = () => {
    return this.http.get<bank[]>(`${environment.baseUrlApi}bank/getBanco`);
  }

  insertBanco = (nombre: string, cuenta: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}bank/insertBanco`, { nombre, cuenta });
  }

  updateBanco = (id: number, nombre: string, cuenta: string) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}bank/updateBanco`, { id, nombre, cuenta });
  }

  deleteBanco = (id: number) => {
    return this.http.post<response[]>(`${environment.baseUrlApi}bank/deleteBanco`, { id });
  }
}
