import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from '../../player';
import { HttpErrorResponse } from '@angular/common/http';
import { PlayerService } from '../../player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() reloadEvent = new EventEmitter();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  public onAddPlayer(addForm: NgForm): void {
    document.getElementById('add-player-form')?.click();
    this.playerService.addPlayer(addForm.value).subscribe(
      (response: Player) => {
        this.reloadEvent.emit()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      },
    );
  }

  public onOpenModal(player: Player | null, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlayerModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
