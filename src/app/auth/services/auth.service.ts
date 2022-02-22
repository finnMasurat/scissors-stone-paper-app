import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string | null = null;

  constructor(private http: HttpClient) {}

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>('http://localhost:8080/authenticate', user)
      .pipe(
        tap(token => this.doLoginUser(user.email, token)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>('http://localhost:8080/authenticate', {
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) ?? '';
  }

  private doLoginUser(username: string, tokens: Token) {
    this.loggedUser = username;
    this.storeToken(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeToken();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeToken(token: Token) {
    localStorage.setItem(this.JWT_TOKEN, token.jwt);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
