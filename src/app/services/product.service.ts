import { Injectable } from '@angular/core';
import { Product, NewProduct } from '../interfaces/new-product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  addProduct(productData: NewProduct): Observable<Product> {
    return this.http.post<Product>(`${this.apiURL}/products`, productData);
  }
}
