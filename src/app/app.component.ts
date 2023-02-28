import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {GameService} from "./services/game.service";
import {GameMode} from "./interfaces/game-mode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameModes$: Observable<GameMode[]>;
  selectedGameMode: GameMode | null = null;

  constructor(public gameService: GameService) {
    this.gameModes$ = gameService.getGameModes();
  }

  ngOnInit(): void {
  }

  onStartClick() {
    if (this.selectedGameMode === null) {
      console.log('Choose Game Mode');
    }
    else {
      this.gameService.startGame$.next(this.selectedGameMode);
    }
  }
}
