import { Injectable } from '@angular/core';
import { ConstModule } from '../consts.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tuteur } from '../models/tuteur';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTuteurService {

  private const = new ConstModule();
  private entity = "/tuteurs/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste de tuteurs de l'API.
   * @returns {Observable<Tuteur[]>} - Un observable qui émet un tableau de tuteurs.
   */
  getDataTuteurs(): Observable<Tuteur[]> {
    return this.httpclient.get<Tuteur[]>(this.apiUrl).pipe(
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
   * Insère un nouvel tuteur dans l'API.
   * @param {Tuteur} data - Les données du tuteur à insérer.
   * @returns {Observable<Tuteur>} - Un observable qui émet le tuteur créé.
   */
  insertDataTuteur(data: Tuteur): Observable<Tuteur> {
    return this.httpclient.post<Tuteur>(this.apiUrl, data, this.httpOptions).pipe(
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
   * Supprime un tuteur de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de tuteur à supprimer.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  deleteDataTuteur(id: number): Observable<any> {
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
   * Récupère un tuteur de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de tuteur à récupérer.
   * @returns {Observable<Tuteur>} - Un observable qui émet tuteur correspondant à l'identifiant donné.
   */
  getTuteurByID(id: number): Observable<Tuteur> {
    return this.httpclient.get<Tuteur>(this.apiUrl + id).pipe(
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
   * Met à jour un tuteur dans l'API en utilisant son identifiant et les données fournies.
   * @param {number} id - L'identifiant de tuteur à mettre à jour.
   * @param {Tuteur} data - Les données de tuteur à mettre à jour.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  updateDataTuteur(id: number, data: Tuteur): Observable<any> {
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
