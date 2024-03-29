import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NewProduct, Product } from '../interfaces/new-product';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  getProducts(page: number, size: number) {
    return this.http.get<Product[]>(
      `${this.apiURL}/products?page=${page}&size=${size}`
    );
  }
}
