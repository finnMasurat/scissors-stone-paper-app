import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  isAuthenticatedSub: BehaviorSubject<boolean>;
  constructor(private http: HttpClient) {
    this.isAuthenticatedSub = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>('http://localhost:8080/authenticate', user)
      .pipe(
        tap(token => this.doLoginUser(token)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) ?? '';
  }

  private doLoginUser(tokens: Token) {
    this.storeToken(tokens);
    this.isAuthenticatedSub.next(true);
  }

  private doLogoutUser() {
    this.removeToken();
    this.isAuthenticatedSub.next(false);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeToken(token: Token) {
    localStorage.setItem(this.JWT_TOKEN, token.jwt);
  }
  // Using it as a fake logout
  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
