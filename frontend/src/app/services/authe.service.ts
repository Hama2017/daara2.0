import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AutheService {

  private apiUrl = 'http://localhost:8000/api'; // URL du backend Laravel

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response:any) => {
        // Stocker l'ID de l'utilisateur dans localStorage
        localStorage.setItem('userId', response.user.id);  // 'response.user.id' doit correspondre à ta structure de réponse
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
