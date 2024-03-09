import { Injectable } from '@angular/core';
import { Product, NewProduct, ProductOnSell } from '../interfaces/new-product';
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

  getMyProductsOnSale(): Observable<ProductOnSell[]> {
    return this.http.get<ProductOnSell[]>(
      `${this.apiURL}/products/myProductsOnSale`
    );
  }
}
