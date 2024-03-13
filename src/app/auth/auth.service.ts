import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserAvatar } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt = new JwtHelperService();
  apiURL = environment.apiURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}/auth/login`, data).pipe(
      tap((loggato) => {
        this.authSubj.next(loggato);

        this.utente = loggato;
        console.log(loggato);
        console.log(data);

        localStorage.setItem('user', JSON.stringify(loggato));
        this.router.navigate(['/home']);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwt.isTokenExpired(userData.token)) {
      this.router.navigate(['/login']);
      return;
    }
    this.authSubj.next(userData);
  }

  register(data: {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiURL}/auth/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError(this.errors);
      })
    );
  }

  getAllUsers() {
    return this.http.get<AuthData[]>(`${this.apiURL}/users`);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/myProfile`);
  }

  uploadAvatar(formData: FormData): Observable<UserAvatar> {
    const headers = new HttpHeaders();

    headers.append('Accept', 'application/json');

    return this.http.post<UserAvatar>(
      'http://localhost:3001/users/editAvatar',
      formData,
      {
        headers: headers,
      }
    );
  }

  private errors(err: any) {
    console.log(err);
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
