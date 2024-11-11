import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConstModule } from '../consts.module';
import { Apprenant } from '../models/apprenant';

@Injectable({
  providedIn: 'root'
})
export class DataApprenantService {

  const = new ConstModule();
  entity: string = "/apprenants/";
  apiUrl: string = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste d'apprenants à partir de l'API.
   *
   * @returns {Observable<Apprenant[]>} Un Observable qui émet un tableau d'apprenants.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  getDataApprenant() {
    return this.httpclient.get(this.apiUrl).pipe(
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

  /**
   * Insère un nouvel apprenant dans l'API.
   *
   * @param data - L'objet Apprenant à insérer.
   * @returns {Observable<any>} - Un Observable qui émet l'objet Apprenant inséré.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  insertDataApprenant(data: Apprenant) {
    return this.httpclient.post(this.apiUrl, data).pipe(
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

  /**
   * Supprime un apprenant spécifique de l'API en fonction de son identifiant.
   *
   * @param id - L'identifiant de l'apprenant à supprimer.
   * @returns {Observable<any>} - Un Observable qui émet un objet de réponse de suppression.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  deleteDataApprenant(id: number) {
    return this.httpclient.delete(this.apiUrl + id).pipe(
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

  /**
   * Récupère un apprenant spécifique de l'API en fonction de son identifiant.
   *
   * @param id - L'identifiant de l'apprenant à récupérer.
   * @returns {Observable<any>} - Un Observable qui émet l'apprenant récupéré.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  getDataApprenantByID(id: number) {
    return this.httpclient.get(this.apiUrl + id).pipe(
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

  /**
   * Met à jour un apprenant spécifique dans l'API en fonction de son identifiant.
   *
   * @param id - L'identifiant de l'apprenant à mettre à jour.
   * @param data - L'objet Apprenant avec les nouvelles données.
   * @returns {Observable<any>} - Un Observable qui émet l'objet Apprenant mis à jour.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  updateDataApprenant(id: number, data: Apprenant) {
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
