import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() reloadEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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
