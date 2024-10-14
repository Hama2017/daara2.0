import { Injectable } from '@angular/core';
import { ConstModule } from '../consts.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrTuteurApprenant } from '../models/tr-tuteur-apprenant';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTrtuteurapprenantService {

  private const = new ConstModule();
  private entity = "/trtuteurapprenant/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste de Tuteur-Apprenantde l'API.
   * @returns {Observable<TrTuteurApprenant[]>} - Un observable qui émet un tableau Tuteur-Apprenant.
   */
  getDataTrTuteurApprenants(): Observable<TrTuteurApprenant[]> {
    return this.httpclient.get<TrTuteurApprenant[]>(this.apiUrl).pipe(
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
   * Insère un nouvel TrTuteur-Apprenant dans l'API.
   * @param {TrTuteurApprenant} data - Les données  à insérer.
   * @returns {Observable<TrTuteurApprenant>} - Un observable qui émet l'objet créé.
   */
  insertDataTrTuteurApprenant(data: TrTuteurApprenant): Observable<TrTuteurApprenant> {
    return this.httpclient.post<TrTuteurApprenant>(this.apiUrl, data, this.httpOptions).pipe(
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
   * Supprime un TrTuteur-Apprenant de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de TrTuteur-Apprenantà supprimer.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  deleteDataTrTuteurApprenant(id: number): Observable<any> {
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
   * Récupère un TrTuteur-Apprenant de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de TrTuteur-Apprenantà récupérer.
   * @returns {Observable<TrTuteurApprenant>} - Un observable qui émet TrTuteur-Apprenant correspondant à l'identifiant donné.
   */
  getTrTuteurApprenantByID(id: number): Observable<TrTuteurApprenant> {
    return this.httpclient.get<TrTuteurApprenant>(this.apiUrl + id).pipe(
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
   * Met à jour un TrTuteur-Apprenant dans l'API en utilisant son identifiant et les données fournies.
   * @param {number} id - L'identifiant de TrTuteur-Apprenantà mettre à jour.
   * @param {TrTuteurApprenant} data - Les données de TrTuteur-Apprenantà mettre à jour.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  updateDataTrTuteurApprenant(id: number, data: TrTuteurApprenant): Observable<any> {
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
