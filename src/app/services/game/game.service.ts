import { Injectable } from '@angular/core';
import { Board } from 'src/app/model/board.model';
import { GameOverListener } from './gameOver.listener';
import { GameStartListener } from './gamestart.listener';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly DEFAULT_BOARD_SIZE = 3;

  private board: Board<number>;
  private turn;

  private filledCells: number;

  private gameOverListeners: GameOverListener[] = [];
  private gameStartListeners: GameStartListener[] = [];

  constructor() { 
    this.initialize();
  }

  startGame() {
    this.initialize();
  }

  play(row: number, column: number) {

    // TODO input validation

    let currentTurn = this.turn;
    this.board.updateCell(row, column, currentTurn);

    this.filledCells++;

    if(this.isVictory(row,column)){
      console.log("Victory by "+ currentTurn);
      this.notifyGameOverListener(currentTurn);
    } else if (this.filledCells == 9) {
      console.log("Game has finished with tie result");
      this.notifyGameOverListener("tie");
    } else {
      // Change turn
      this.turn = (this.turn % 2) + 1; 
    }

    return currentTurn;
  }

  public addGameOverListener(gameOverListener: GameOverListener) {
    this.gameOverListeners.push(gameOverListener);
  }

  private notifyGameOverListener(winner: string) {
    this.gameOverListeners.forEach(element => {
      element.onGameOver(winner);
    });
  }

  public addGameStartListener(gameStartListener: GameStartListener) {
    this.gameStartListeners.push(gameStartListener);
  }

  private notifyGameStartListener() {
    this.gameStartListeners.forEach(element => {
      element.onGameStart();
    });
  }

  private isVictory(row: number, column: number) {
    console.log(this.board);
    return (this.isRowVictory(row) || 
            this.isColumnVictory(column) || 
            this.isDiagonalVictory(true) || 
            this.isDiagonalVictory(false));

  }

  private isDiagonalVictory(topDiagonal: boolean) {
    let isSameValue: boolean = true;

    let row = this.DEFAULT_BOARD_SIZE - 1;

    if(topDiagonal) {
      row = 0;
    }

    let column = 0;

    while((isSameValue) && (column < this.DEFAULT_BOARD_SIZE)) {
      let value = this.board.getCell(row,column);
      isSameValue = (value == this.turn);

      if(topDiagonal) {
        row++;
      } else {
        row--;
      }

      column++;
    }
    
    console.log('Diagonal victory ('+topDiagonal+') = '+isSameValue);
    return isSameValue;
  }

  private isRowVictory(row: number) {

    let isSameValue: boolean = true;
    let column: number = 0;

    while((isSameValue && (column < this.DEFAULT_BOARD_SIZE))) {
      let value = this.board.getCell(row,column);
      isSameValue = (value == this.turn);
      column++;
    }
    console.log("Row victory =  "+isSameValue);
    return isSameValue;
  }

  
  private isColumnVictory(column: number) {

    let isSameValue: boolean = true;
    let row: number = 0;

    while((isSameValue && (row < this.DEFAULT_BOARD_SIZE))) {
      let value = this.board.getCell(row,column);
      isSameValue = (value == this.turn);
      row++;
    }
    console.log('Column  victory = '+isSameValue);
    return isSameValue;
  }

  private initialize(){
    this.turn = 1;
    this.filledCells = 0;
    this.board = new Board(this.DEFAULT_BOARD_SIZE, 0);
    this.notifyGameStartListener();
  }


}
