import { Component, OnInit } from '@angular/core';
import { Player } from './interfaces/player';
import { PlayerService } from './player.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public players: Player[] = [];
  public editPlayer: Player | null = null;
  public deletePlayer: Player | null = null;
  title = 'scissors-stone-paper-app';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {

  }

  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (response: Player[]) => {
        this.players = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        this.getPlayers()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      },
    );
  }

  public onDeletePlayer(playerId: number | undefined): void {
    if (playerId) {
      this.playerService.deletePlayer(playerId).subscribe(
        (response: void) => {
          this.getPlayers()
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        },
      );
    }
  }

  public onOpenModal(player: Player | null, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch (mode) {
      case 'add':
        button.setAttribute('data-target', '#addPlayerModal');
        break;
      case 'edit':
        this.editPlayer = player;
        button.setAttribute('data-target', '#updatePlayerModal');
        break;
      case 'delete':
        this.deletePlayer = player;
        button.setAttribute('data-target', '#deletePlayerModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public reloadPlayers() {
    this.getPlayers();
  }
}
