import { Injectable } from '@angular/core';
import { Product } from '../interfaces/new-product';
import { ModifyUser, User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  updateUser(user: ModifyUser): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/users/editProfile`, user);
  }
}
