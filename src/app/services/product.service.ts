import { Injectable } from '@angular/core';
import { Product, NewProduct, ProductOnSell } from '../interfaces/new-product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = environment.apiURL;
  private searchQuerySubject = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  addProduct(productData: Partial<NewProduct>) {
    return this.http.post<Product>(`${this.apiURL}/products`, productData);
  }

  uploadAvatar(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<any>(`${this.apiURL}/products/uploadImg`, formData, {
      headers: headers,
    });
  }

  getMyProductsOnSale(): Observable<ProductOnSell[]> {
    return this.http.get<ProductOnSell[]>(
      `${this.apiURL}/products/myProductsOnSale`
    );
  }
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/products/${productId}`);
  }
  updateProduct(
    productId: string,
    modifiedProduct: {
      name: string;
      description: string;
      type: string;
      price: number;
    }
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiURL}/products/${productId}`,
      modifiedProduct
    );
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiURL}/products/${id}`);
  }

  getProductsByNameContaining(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiURL}/products/byName?name=${name}`
    );
  }

  get searchQuery$(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  searchProducts(name: string, type: string): Observable<Product[]> {
    const params = { name, type };
    return this.http.get<Product[]>(`${this.apiURL}/products/search`, {
      params,
    });
  }
}
