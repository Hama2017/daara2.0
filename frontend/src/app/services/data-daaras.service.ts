import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConstModule} from "../consts.module";
import {map, Observable} from "rxjs";
import {Daara} from "../models/daara";

@Injectable({
  providedIn: 'root'
})
export class DataDaarasService {

  private const = new ConstModule();
  private entity = "/daaras/";
  private apiUrl = this.const.url + this.entity;

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // Méthode pour récupérer toutes les  (Daaras)
  getDaaras(): Observable<Daara[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
        map(data => data.map(item => new Daara(item))) // Désérialisation en instances de Ecole
    );
  }
  getDaarasById(id: number): Observable<Daara> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
        map(data => new Daara(data)) // Désérialisation en instance de Ecole
    );
  }
}
