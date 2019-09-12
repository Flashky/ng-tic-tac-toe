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

  constructor(private gameService: GameService) { 
    this.gameService.addGameOverListener(this);
    this.gameService.addGameStartListener(this);
  }

  ngOnInit() {
    this.initialize();
  }

  onGameOver(winner: string) {
    this.message = "Winner: " + winner;
  }

  onGameStart() {
    this.initialize();
  }

  getMessage() {
    return this.message;
  }

  private initialize() {
    this.message = "";
  }

}
