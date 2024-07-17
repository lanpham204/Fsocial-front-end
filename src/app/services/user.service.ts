import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'inspector';
import { UserResponse } from '../responses/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUser = environment.apiBaseUrl+`/users`;
  constructor(private http: HttpClient) { }
  register(user: Object): Observable<any> {
    return this.http.post(this.apiUser+`/register`,user);
  }
  login(email: string, password: string): Observable<any> {
    const user = {email,password};
    return this.http.post(this.apiUser+`/login`,user);
  }
  getById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.apiUser+`/${id}`)
  }
  verifyUser(id: string, code: string): Observable<any> {
    return this.http.post(this.apiUser+`/validator-email/${id}`,{code});
  }
}
