import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

}
