import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductOnSell } from '../interfaces/new-product';
import { Cart } from '../interfaces/cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  addItemToCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiURL}/items/${productId}`, productId);
  }

  deleteItemFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/items/${productId}`);
  }

  getMyCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiURL}/carts/myCart`);
  }
}
