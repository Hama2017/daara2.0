import { Injectable } from '@angular/core';
import {ConstModule} from "../consts.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Departement {
  id: number;
  nomDepartement: string;
  region: {
    id: number;
    nomRegion: string;
    codeRegion: string;
  };
}
@Injectable({
  providedIn: 'root'
})

export class DataDepartementService {
  private const = new ConstModule();
  private entity = "/departements/";
  private apiUrl = this.const.url + this.entity;
  constructor(private http: HttpClient) { }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }
}
