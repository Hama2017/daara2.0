import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConstModule } from '../consts.module';
import {TypeDocument} from "../models/type-document";

@Injectable({
  providedIn: 'root'
})
export class DataTypeDocumentService {

  const = new ConstModule();
  //Entity est la variable qui va contenir le nom de l'entite a contacter par api
  entity:string="/typedocuments/";
  //apiUrl represente la varibale qui va contenir l'url du serveur et le nom de l'entite
  //elle forme l'url finale
  apiUrl:string=this.const.url+this.entity;
  constructor(private httpclient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste de types de documents à partir de l'API.
   *
   * @returns {Observable<TypeDocument[]>} Un Observable qui émet un tableau de types de documents.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  getDataTypeDocument() {
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
   * Insère un nouveau type de document dans l'API.
   *
   * @param data - L'objet TypeDocument à insérer.
   * @returns {Observable<any>} - Un Observable qui émet l'objet TypeDocument inséré.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  insertDataTypeDocument(data: TypeDocument) {
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
   * Supprime un type de document spécifique de l'API en fonction de son identifiant.
   *
   * @param id - L'identifiant du type de document à supprimer.
   * @returns {Observable<any>} - Un Observable qui émet un objet de réponse de suppression.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  deleteDataTypeDocument(id: number) {
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
   * Récupère un type de document spécifique de l'API en fonction de son identifiant.
   *
   * @param id - L'identifiant du type de document à récupérer.
   * @returns {Observable<any>} - Un Observable qui émet le type de document récupéré.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   *
   * */
  getDataTypeDocumentByID(id: number) {
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
   * Met à jour un type de document spécifique dans l'API en fonction de son identifiant.
   *
   * @param id - L'identifiant du type de document à mettre à jour.
   * @param data - L'objet TypeDocument avec les nouvelles données.
   * @returns {Observable<any>} - Un Observable qui émet l'objet TypeDocument mis à jour.
   * Si une erreur se produit pendant la requête, l'Observable émet un objet d'erreur avec un message d'erreur formaté.
   */
  updateDataTypeDocument(id: number, data: TypeDocument) {
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

  getDataTypeDocumentApprenant() {
    return this.getDataTypeDocument().pipe(
      map((data: any) => {
        // Vérifie si la récupération est un succès et filtre les données
        if (Array.isArray(data)) {
          return data.filter((doc: TypeDocument) => doc.TypeDoc === 'Apprenant');
        }
        // Retourne une liste vide si une erreur s'est produite
        return [];
      }),
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
