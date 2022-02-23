import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Statistic } from './interfaces/stats';

@Injectable({providedIn: 'root'})
export class StatsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPlayerStats(): Observable<Statistic> {
    return this.http.get<Statistic>(`${this.apiServerUrl}/statistic/currentuser`);
  }
}
