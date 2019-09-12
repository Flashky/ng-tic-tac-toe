import { Component, OnInit } from '@angular/core';
import { GameOverListener } from '../services/game/gameOver.listener';
import { GameService } from '../services/game/game.service';
import { GameStartListener } from '../services/game/gamestart.listener';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, GameOverListener, GameStartListener {


  private message: string;
  private messageClass: string;

  constructor(private gameService: GameService) { 
    this.gameService.addGameOverListener(this);
    this.gameService.addGameStartListener(this);
  }

  ngOnInit() {
    this.initialize();
  }

  onGameOver(winner: string) {
    if(winner == 'tie') {
      this.message = 'Draw game... :-( Want to play again?';
      this.messageClass = 'span-6 alert alert-warning';
    } else {
      this.message = 'Player '+ winner + ' has won the match!';
      this.messageClass = 'span-6 alert alert-success';
    }
    
  }

  onGameStart() {
    this.initialize();
  }

  getMessage() {
    return this.message;
  }

  getClass() {
    return this.messageClass;
  }

  private initialize() {
    this.message = "";
  }

}
