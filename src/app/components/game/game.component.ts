import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {Field} from "../../interfaces/field";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  fields: boolean[][] = [[]];

  constructor(private cdr: ChangeDetectorRef,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.startGame$.subscribe((mode) => {
      const rows = [];
      for (let i = 0; i < mode.field; i++) {
        const row: boolean[] = [];
        for (let j = 0; j < mode.field; j++) {
          row.push(false);
        }
        rows.push(row);
      }
      this.fields = rows;
      this.cdr.markForCheck();
    });
  }

  onMouseEnter(field: Field) {
    this.fields[field.row][field.col] = !this.fields[field.row][field.col];
    this.gameService.lastHoveredSquare$.next(field);
  }

  trackBy() {
    return true;
  }

}
