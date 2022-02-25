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
    this.resetGame();
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
      if (this.playerWins > this.roboWins) {
        this.statsService.postPlayerResult('win')
          .subscribe((response) => this.openModal('win'))
      }
      if (this.playerWins < this.roboWins) {
        this.statsService.postPlayerResult('loss')
          .subscribe((response) => this.openModal('loss'))
      }
      if (this.playerWins === this.roboWins) {
        this.statsService.postPlayerResult('draw')
          .subscribe((response) => this.openModal('draw'))
      }
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
    this.playerResult.push(this.createResult(playerGesture, playerWin));
    this.roboResult.push(this.createResult(roboGesture, roboWin));
    this.calcResult(playerWin, roboWin);
  }

  public openModal(result: String): void {
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch (result) {
      case 'win':
        console.log('win')
        button.setAttribute('data-target', '#winModal');
        break;
      case 'loss':
        console.log('loss')
        button.setAttribute('data-target', '#lossModal');
        break;
      case 'draw':
        console.log('draw')
        button.setAttribute('data-target', '#drawModal');
    }
    container?.appendChild(button);
    button.click();
  }




}
