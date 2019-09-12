import { Component, OnInit, Input } from '@angular/core';
import { GameOverListener } from 'src/app/services/game/gameOver.listener';
import { GameService } from 'src/app/services/game/game.service';
import { GameStartListener } from 'src/app/services/game/gamestart.listener';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, GameOverListener, GameStartListener {

  @Input()
  private row: number;

  @Input()
  private column: number;

  /**
   * The value contained of the cell. 
   * Can be either X, O or empty.
   */
  private value: string;

  /**
   * Allows the component to be clickable or not.
   */
  private disabled: boolean;

  constructor(private gameService: GameService) {
    this.gameService.addGameOverListener(this);
    this.gameService.addGameStartListener(this);
  }

  ngOnInit() {
    this.initialize();
  }

  getCellClass() {
    return 'player-'+this.value;
  }

  onSelectCell() {
    this.value = this.gameService.play(this.row, this.column);
    this.disabled = true;
  }

  onGameOver(winner: string) {
    this.disabled = true;
  }

  onGameStart() {
    this.initialize();
  }

  isDisabled() {
    return this.disabled;
  }

  
  private initialize() {
    this.disabled = false;
    this.value = "";
  }


}
