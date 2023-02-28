import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, scan, startWith, switchMap} from "rxjs";
import {Field} from "../../interfaces/field";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-hover-squares',
  templateUrl: './hover-squares.component.html',
  styleUrls: ['./hover-squares.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoverSquaresComponent implements OnInit {
  lastHoveredSquares$!: Observable<Field[]>;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.lastHoveredSquares$ = this.gameService.startGame$.pipe(
      switchMap(_ => {
        return this.gameService.lastHoveredSquare$.pipe(
          scan((acc: Field[], curr) => {
            acc.unshift(curr);
            return acc.slice(0, 5);
          }, []),
          startWith([])
        );
      })
    )
  }

}
