import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {ConstModule} from "../consts.module";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AutheService {
  private const = new ConstModule();
  private apiUrl = this.const.url ;
  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response:any) => {
       localStorage.setItem('user', JSON.stringify(response.user)); 
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
