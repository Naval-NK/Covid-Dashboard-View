import { CovidData } from './CovidData';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private _url: string;
  constructor(private http:HttpClient) { 
    this._url = 'http://localhost:8080/covid-data';
  }

  public getCovidData():Observable<CovidData[]>{
    return this.http.get<CovidData[]>(this._url);
  }

}
