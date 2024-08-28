import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConstModule } from '../consts.module'; 
import { Profil } from '../models/profil'; 

@Injectable({
  providedIn: 'root'
})
export class DataProfilService {

  private const = new ConstModule();
  private entity = "/profils/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste de profils de l'API.
   * Utilise le module HttpClient pour effectuer une requête GET vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @returns {Observable<Profil[]>} - Un observable qui émet un tableau de profils.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  getDataProfil(): Observable<Profil[]> {
    return this.httpclient.get<Profil[]>(this.apiUrl).pipe(
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
   * Insère un nouveau profil dans l'API.
   * Utilise le module HttpClient pour effectuer une requête POST vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {Profil} data - Les données du profil à insérer.
   *
   * @returns {Observable<Profil>} - Un observable qui émet le profil créé.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  insertDataProfil(data: Profil): Observable<Profil> {
    return this.httpclient.post<Profil>(this.apiUrl, data, this.httpOptions).pipe(
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
   * Supprime un profil de l'API en utilisant son identifiant.
   * Utilise le module HttpClient pour effectuer une requête DELETE vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {number} id - L'identifiant du profil à supprimer.
   *
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  deleteDataProfil(id: number): Observable<any> {
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
   * Récupère un profil de l'API en utilisant son identifiant.
   * Utilise le module HttpClient pour effectuer une requête GET vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {number} id - L'identifiant du profil à récupérer.
   *
   * @returns {Observable<Profil>} - Un observable qui émet le profil correspondant à l'identifiant donné.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  getProfilByID(id: number): Observable<Profil> {
    return this.httpclient.get<Profil>(this.apiUrl + id).pipe(
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
   * Met à jour un profil dans l'API en utilisant son identifiant et les données fournies.
   * Utilise le module HttpClient pour effectuer une requête PUT vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {number} id - L'identifiant du profil à mettre à jour.
   * @param {Profil} data - Les données du profil à mettre à jour.
   *
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  updateDataProfil(id: number, data: Profil): Observable<any> {
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
