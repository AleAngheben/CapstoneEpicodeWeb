import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiURL = environment.apiURL;
  private stripeKEY = environment.stripePublicKey;

  constructor(private http: HttpClient) {}

  startPayment(paymentRequest: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiURL}/start-payment`,
      paymentRequest
    );
  }
}
