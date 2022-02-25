import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'scissors-stone-paper-app';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
  }
}
