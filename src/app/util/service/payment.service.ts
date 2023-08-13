import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { payment } from '../interface/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getPayment = () => {
    return this.http.get<payment[]>(`${environment.baseUrlApi}payment/getPago`);
  }
}
