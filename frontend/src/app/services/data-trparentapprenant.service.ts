import { Injectable } from '@angular/core';
import { ConstModule } from '../consts.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';
import { TrParentApprenant } from '../models/tr-parent-apprenant';

@Injectable({
  providedIn: 'root'
})
export class DataTrparentapprenantService {

  private const = new ConstModule();
  private entity = "/trparentapprenant/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste de Parent-Apprenant de l'API.
   * @returns {Observable<TrParentApprenant[]>} - Un observable qui émet un tableau de Parent-Apprenant.
   */
  getDataTrParentApprenants(): Observable<TrParentApprenant[]> {
    return this.httpclient.get<TrParentApprenant[]>(this.apiUrl).pipe(
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
   * Insère un nouvel TrParent-Apprenant dans l'API.
   * @param {TrParentApprenant} data - Les données du Parent-Apprenant à insérer.
   * @returns {Observable<TrParentApprenant>} - Un observable qui émet le Parent-Apprenant créé.
   */
  insertDataTrParentApprenant(data: TrParentApprenant): Observable<TrParentApprenant> {
    return this.httpclient.post<TrParentApprenant>(this.apiUrl, data, this.httpOptions).pipe(
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
   * Supprime un TrParent-Apprenant de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de TrParent-Apprenant à supprimer.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  deleteDataTrParentApprenant(id: number): Observable<any> {
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
   * Récupère un TrParent-Apprenant de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de TrParent-Apprenant à récupérer.
   * @returns {Observable<TrParentApprenant>} - Un observable qui émet TrParent-Apprenant correspondant à l'identifiant donné.
   */
  getTrParentApprenantByID(id: number): Observable<TrParentApprenant> {
    return this.httpclient.get<TrParentApprenant>(this.apiUrl + id).pipe(
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
   * Met à jour un TrParent-Apprenant dans l'API en utilisant son identifiant et les données fournies.
   * @param {number} id - L'identifiant de TrParent-Apprenant à mettre à jour.
   * @param {TrParentApprenant} data - Les données de TrParent-Apprenant à mettre à jour.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  updateDataTrParentApprenant(id: number, data: TrParentApprenant): Observable<any> {
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
