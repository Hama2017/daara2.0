import { Injectable } from '@angular/core';
import {ConstModule} from "../consts.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IA} from "../models/ia";

@Injectable({
  providedIn: 'root'
})
export class DataIasService {
  private const = new ConstModule();
  private entity = "/ias/";
  private apiUrl = this.const.url + this.entity;

  constructor(private httpclient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getIAs(): Observable<IA[]> {
    return this.httpclient.get<IA[]>(this.apiUrl);
  }
}
