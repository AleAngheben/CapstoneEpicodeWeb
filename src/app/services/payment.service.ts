import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createCharge(stripeToken: string, amount: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.stripeKEY}`,
    });
    const body = new FormData();
    body.append('stripeToken', stripeToken);
    body.append('amount', amount.toString());
    return this.http.post('https://api.stripe.com/v1/charges', body, {
      headers,
    });
  }
}
