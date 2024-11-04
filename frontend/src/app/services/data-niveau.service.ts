import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Niveau } from '../models/niveau';
import { ConstModule } from '../consts.module';

@Injectable({
  providedIn: 'root',
})
export class DataNiveauService {
  private const = new ConstModule();
  private entity = '/tdniveaux/';
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère la liste des niveaux.
   */
  getNiveaux(): Observable<Niveau[]> {
    return this.httpclient.get<Niveau[]>(this.apiUrl).pipe(
      catchError((error) => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue',
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Ajoute un nouveau niveau.
   */
  insertNiveau(data: Niveau): Observable<Niveau> {
    return this.httpclient.post<Niveau>(this.apiUrl, data, this.httpOptions).pipe(
      catchError((error) => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue',
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Supprime un niveau par ID.
   */
  deleteNiveau(id: number): Observable<any> {
    return this.httpclient.delete(this.apiUrl + id).pipe(
      catchError((error) => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue',
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Récupère un niveau par son ID.
   */
  getNiveauByID(id: number): Observable<Niveau> {
    return this.httpclient.get<Niveau>(this.apiUrl + id).pipe(
      catchError((error) => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue',
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Met à jour un niveau.
   */
  updateNiveau(id: number, data: Niveau): Observable<any> {
    return this.httpclient.put(this.apiUrl + id, data, this.httpOptions).pipe(
      catchError((error) => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue',
        };
        return of(formattedError);
      })
    );
  }
}
