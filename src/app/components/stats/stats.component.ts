import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../stats.service';
import { HighScore } from '../../interfaces/highscore';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public highScores: HighScore[] = [
    {name: 'player 1', drawCount: 4, winCount: 10, lossCount: 1},
    {name: 'player 1', drawCount: 4, winCount: 10, lossCount: 1},
    {name: 'player 1', drawCount: 4, winCount: 10, lossCount: 1},
    {name: 'player 1', drawCount: 4, winCount: 10, lossCount: 1},
  ];
  constructor(private statisticService: StatsService) { }

  ngOnInit(): void {
    this.statisticService.getHighScores().subscribe((response) => {
      this.highScores = response;
    })
  }

}
