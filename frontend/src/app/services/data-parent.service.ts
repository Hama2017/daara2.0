import { Injectable } from '@angular/core';
import { ConstModule } from '../consts.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parent } from '../models/parent';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataParentService {

  private const = new ConstModule();
  private entity = "/parents/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste de parents de l'API.
   * @returns {Observable<Parent[]>} - Un observable qui émet un tableau de parents.
   */
  getDataParents(): Observable<Parent[]> {
    return this.httpclient.get<Parent[]>(this.apiUrl).pipe(
      catchError(error => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue'
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Insère un nouvel parent dans l'API.
   * @param {Parent} data - Les données du parent à insérer.
   * @returns {Observable<Parent>} - Un observable qui émet le parent créé.
   */
  insertDataParent(data: Parent): Observable<Parent> {
    return this.httpclient.post<Parent>(this.apiUrl, data, this.httpOptions).pipe(
      catchError(error => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue'
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Supprime un parent de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de parent à supprimer.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  deleteDataParent(id: number): Observable<any> {
    return this.httpclient.delete(this.apiUrl + id).pipe(
      catchError(error => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue'
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Récupère un parent de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de parent à récupérer.
   * @returns {Observable<Parent>} - Un observable qui émet parent correspondant à l'identifiant donné.
   */
  getParentByID(id: number): Observable<Parent> {
    return this.httpclient.get<Parent>(this.apiUrl + id).pipe(
      catchError(error => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue'
        };
        return of(formattedError as any);
      })
    );
  }

  /**
   * Met à jour un parent dans l'API en utilisant son identifiant et les données fournies.
   * @param {number} id - L'identifiant de parent à mettre à jour.
   * @param {Parent} data - Les données de parent à mettre à jour.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  updateDataParent(id: number, data: Parent): Observable<any> {
    return this.httpclient.put(this.apiUrl + id, JSON.stringify(data), this.httpOptions).pipe(
      catchError(error => {
        const formattedError = {
          success: false,
          message: error.message,
          error: error.statusText || 'Erreur Inconnue'
        };
        return of(formattedError);
      })
    );
  }
}
