import {Component, OnInit} from '@angular/core';
import { Statistic } from '../../interfaces/stats';
import { StatsService } from '../../stats.service';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stats: Statistic | null = null;
  total: number = 0;

  constructor(private statsService: StatsService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.statsService.getPlayerStats().subscribe(
      (response) =>  {
        this.stats = response;
        if (this.stats) {
          this.total = this.getTotal(this.stats);
        }
      }
    );
  }

  getTotal(stats: Statistic): number {
    return stats.winCount + stats.lossCount + stats.drawCount;
  }

}
