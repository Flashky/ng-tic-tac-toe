import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  onGameStart() {
    this.gameService.startGame();
  }

}
