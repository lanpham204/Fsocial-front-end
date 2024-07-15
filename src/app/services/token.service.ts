import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'inspector';
import { UserResponse } from '../responses/user.response';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelperService = new JwtHelperService();
  private readonly TOKEN_KEY = 'access_token'
  constructor() { }
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
  setToken(token: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }
  removeToken(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.TOKEN_KEY)
    }
  }
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }
  isTokenExpired(): boolean {
    // if (this.getToken() != null) {
    //   return true;
    // }
    return this.jwtHelperService.isTokenExpired(this.getToken())
  }
  getUserIdByToken(): string {
    const tokenObject = this.jwtHelperService.decodeToken(this.getToken() ?? '')
    return 'userId' in tokenObject ? tokenObject['userId'] : ''
  }
  getRoleByToken(): string {
    const tokenObject = this.jwtHelperService.decodeToken(this.getToken() ?? '')
    return 'role' in tokenObject ? tokenObject['role'] : ''
  }
}
