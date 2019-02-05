import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Start, Game, SessionId } from '../settings.objects';
import { ScreenService } from '../../screen/service/screen.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private gamesUrl = 'http://localhost:8080/games';
  private startUrl = 'http://localhost:8080/start';
  private stopUrl = 'http://localhost:8080/stop';
  id: SessionId;
  
  constructor(private http: HttpClient, private screenService: ScreenService) { }
  
  
  getGames (): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl);
  }

  startGame (start: Start): void {
    this.http.post<SessionId>(this.startUrl, start, httpOptions).subscribe((result) => {
      this.id = result;
      this.screenService.startService(result.id);
    });
  }

  stopGame (): void {
    this.http.post(this.stopUrl, this.id, httpOptions).subscribe(() => {
      this.id = null;
      this.screenService.stopService();
    });

  }
}
