import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './interfaces/player';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PlayerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiServerUrl}/player`);
  }

  public getPlayer(playerId: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiServerUrl}/player${playerId}`);
  }

  public registerPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiServerUrl}/player/register`, player);
  }

  public updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiServerUrl}/player`, player);
  }

  public deletePlayer(playerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/player/${playerId}`)
  }

  public getPlayerMetaData(): Observable<Player> {
    return this.http.get<Player>(`${this.apiServerUrl}/player/userdata`);
  }

}
