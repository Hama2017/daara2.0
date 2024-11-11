import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConstModule } from '../consts.module';
import {Inscription} from "../models/inscription";

@Injectable({
  providedIn: 'root'
})
export class DataInscriptionService {
  // Instanciation de la classe ConstModule pour accéder à l'URL de base
  const = new ConstModule();

  // Nom de l'entité à contacter par l'API
  entity: string = "/inscriptions/";

  // Formation de l'URL finale en combinant l'URL de base et le nom de l'entité
  apiUrl: string = this.const.url + this.entity;

  // Configuration des en-têtes HTTP pour les requêtes
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpclient: HttpClient) { }

  /**
   * Récupère toutes les inscriptions de l'API.
   * Utilise le module HttpClient pour effectuer une requête GET vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @returns {Observable<Inscription[]>} - Un observable qui émet un tableau d'inscriptions.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  getDataInscription() {
    return this.httpclient.get(this.apiUrl).pipe(
      catchError(error => {
        // Gestion des erreurs en formatant la réponse
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
   * Insère une nouvelle inscription dans l'API.
   * Utilise le module HttpClient pour effectuer une requête POST vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {Inscription} data - Les données de l'inscription à insérer.
   *
   * @returns {Observable<Inscription>} - Un observable qui émet l'inscription créée.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  insertDataInscription(data: Inscription) {
    return this.httpclient.post(this.apiUrl, data).pipe(
      catchError(error => {
        // Gestion des erreurs en formatant la réponse
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
   * Supprime une inscription de l'API en utilisant son identifiant.
   * Utilise le module HttpClient pour effectuer une requête DELETE vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {number} id - L'identifiant de l'inscription à supprimer.
   *
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  deleteDataInscription(id: number) {
    return this.httpclient.delete(this.apiUrl + id).pipe(
      catchError(error => {
        // Gestion des erreurs en formatant la réponse
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
   * Récupère une inscription de l'API en utilisant son identifiant.
   * Utilise le module HttpClient pour effectuer une requête GET vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {number} id - L'identifiant de l'inscription à récupérer.
   *
   * @returns {Observable<Inscription>} - Un observable qui émet l'inscription correspondant à l'identifiant donné.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  getInscriptionByID(id: number) {
    return this.httpclient.get(this.apiUrl + id).pipe(
      catchError(error => {
        // Gestion des erreurs en formatant la réponse
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
   * Met à jour une inscription dans l'API en utilisant son identifiant et les données fournies.
   * Utilise le module HttpClient pour effectuer une requête PUT vers l'URL API spécifiée.
   * Gère les erreurs en interceptant les erreurs et en renvoyant un observable avec un objet d'erreur formaté.
   *
   * @param {number} id - L'identifiant de l'inscription à mettre à jour.
   * @param {Inscription} data - Les données de l'inscription à mettre à jour.
   *
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   * Si une erreur se produit lors de la requête, l'observable émet un objet d'erreur.
   */
  updateDataInscription(id: number, data: Inscription) {
    return this.httpclient.put(this.apiUrl + id, JSON.stringify(data), this.httpOptions).pipe(
      catchError(error => {
        // Gestion des erreurs en formatant la réponse
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
