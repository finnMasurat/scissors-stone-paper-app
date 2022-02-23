import { Component, OnInit } from '@angular/core';
import { GameResult } from '../../interfaces/gameResult';
import { StatsService } from '../../stats.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  statsService: StatsService;
  playerResult: GameResult[] = [];
  roboResult: GameResult[] = [];
  gameFinished: boolean = false;
  playerWins: number = 0;
  roboWins: number = 0;

  gestureOptions: string[] = [
    'rock',
    'paper',
    'scissors'
  ];

  constructor(statsService: StatsService) {
    this.statsService = statsService;
  }

  ngOnInit(): void {
  }

  roboGesture(): string {
    const randomIndex = Math.floor(Math.random()*this.gestureOptions.length);
    return this.gestureOptions[randomIndex]
  }

  createResult(gesture: string, win: boolean): GameResult {
    return {
      win,
      gesture
    }
  }
  calcResult(playerWin: boolean, roboWin: boolean) {
    if (playerWin) this.playerWins+=1;
    if (roboWin) this.roboWins+=1;

    if (this.playerResult.length >= 9) {
      this.gameFinished = true;
      if (this.playerWins > this.roboWins) this.statsService.

    }
  }

  resetGame() {
    this.gameFinished = false;
    this.playerResult = [];
    this.roboResult = [];
    this.playerWins = 0;
    this.roboWins = 0;
  }

  onGestureSelected(playerGesture: string) {
    let playerWin: boolean = false;
    let roboWin: boolean = false;
    const roboGesture = this.roboGesture();
    switch (playerGesture) {
      case 'rock':
        if (roboGesture === 'scissors') playerWin = true;
        if (roboGesture === 'paper') roboWin = true;
        break;
      case 'paper':
        if (roboGesture === 'rock') playerWin = true;
        if (roboGesture === 'scissors') roboWin = true;
        break;
      case 'scissors':
        if (roboGesture === 'paper') playerWin = true;
        if (roboGesture === 'rock') roboWin = true;
        break;
    }
    this.calcResult(playerWin, roboWin);
    this.playerResult.push(this.createResult(playerGesture, playerWin));
    this.roboResult.push(this.createResult(roboGesture, roboWin));
  }




}
