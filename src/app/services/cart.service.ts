import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductOnSell } from '../interfaces/new-product';
import { Cart } from '../interfaces/cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiURL = environment.apiURL;
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({
    id: '',
    items: [],
    cartPrice: 0,
  });
  constructor(private http: HttpClient) {}

  addItemToCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiURL}/items/${productId}`, productId);
  }

  deleteItemFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/items/delete/${itemId}`);
  }

  getMyCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiURL}/carts/myCart`);
  }

  itemPlusOnCart(itemId: string): Observable<any> {
    return this.http.put(`${this.apiURL}/items/add/${itemId}`, itemId);
  }

  itemMinusOnCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/items/minus/${productId}`);
  }

  clearCart(cartId: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiURL}/carts/empty/${cartId}`, cartId);
  }

  //badge
  // updateCart(cart: Cart): void {
  //   this.cartSubject.next(cart);
  // }
  // getCartObservable(): Observable<Cart> {
  //   return this.cartSubject.asObservable();
  // }
}
