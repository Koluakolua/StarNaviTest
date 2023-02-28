import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Field} from "../interfaces/field";
import {HttpClient} from "@angular/common/http";
import {GameMode} from "../interfaces/game-mode";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  lastHoveredSquare$ = new Subject<Field>();
  startGame$ = new ReplaySubject<GameMode>(1);

  constructor(private http: HttpClient) { }

  getGameModes(): Observable<GameMode[]> {
    return this.http.get<GameMode[]>('http://demo7919674.mockable.io');
  }
}
