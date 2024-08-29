import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { UserRequest } from '../entity/UserRequest';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  // login(body:UserRequest) {
  //   return this.http
  //     .post<{ token: string }>(this.urlService.concat("noauth/login"), body)
  //     .subscribe((response) => {
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['/home']);
  //     });
  // }
  private tokenKey = 'token';


  login(body: UserRequest): Observable<any> {
    return this.postToken(`noauth/login`, body);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // isAuthenticated(): boolean {
  //   if (this.isLocalStorageAvailable()) return !!localStorage.getItem(this.tokenKey);
  //   return false;
  // }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()){
      if (this.isTokenExpired()){
        this.logout()
        return false
      }
      return !!localStorage.getItem('token')
    };
    return false;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token == null) return false;

    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate < new Date()
    }
    return false;
  }


  getToken(): string | null {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.roles) {
      return decodedToken.roles;
    }
    return null;
  }

  getUserData() {
    const decodedToken = this.getDecodedToken();
    return decodedToken;
  }


  public isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
