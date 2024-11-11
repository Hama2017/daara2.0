import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConstModule } from '../consts.module'; 
import { User } from '../models/user'; 
import { Profil } from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  private const = new ConstModule();
  private entity = "/users/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Récupère une liste d'utilisateurs de l'API.
   * @returns {Observable<User[]>} - Un observable qui émet un tableau d'utilisateurs.
   */
  getDataUser(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.apiUrl).pipe(
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
    // Méthode pour récupérer les profils
    getProfils(): Observable<Profil[]> {
      return this.httpclient.get<Profil[]>(`${this.const.url}/profils`).pipe(
        catchError(this.handleError<Profil[]>('getProfils', []))
      );
    }
      // Gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  getProfilById(idProfil: number): Observable<Profil> {
    return this.httpclient.get<Profil>(`${this.const.url}/profils/${idProfil}`);
  }

  /**
   * Insère un nouvel utilisateur dans l'API.
   * @param {User} data - Les données de l'utilisateur à insérer.
   * @returns {Observable<User>} - Un observable qui émet l'utilisateur créé.
   */
  insertDataUser(data: User): Observable<User> {
    return this.httpclient.post<User>(this.apiUrl, data, this.httpOptions).pipe(
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
   * Supprime un utilisateur de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de l'utilisateur à supprimer.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  deleteDataUser(id: number): Observable<any> {
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
   * Récupère un utilisateur de l'API en utilisant son identifiant.
   * @param {number} id - L'identifiant de l'utilisateur à récupérer.
   * @returns {Observable<User>} - Un observable qui émet l'utilisateur correspondant à l'identifiant donné.
   */
  getUserByID(id: number): Observable<User> {
    return this.httpclient.get<User>(this.apiUrl + id).pipe(
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
   * Met à jour un utilisateur dans l'API en utilisant son identifiant et les données fournies.
   * @param {number} id - L'identifiant de l'utilisateur à mettre à jour.
   * @param {User} data - Les données de l'utilisateur à mettre à jour.
   * @returns {Observable<any>} - Un observable qui émet un objet de réponse vide.
   */
  updateDataUser(id: number, data: User): Observable<any> {
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
