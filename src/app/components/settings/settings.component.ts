import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { PlayerService } from '../../player.service';
import {faKey} from '@fortawesome/free-solid-svg-icons'
import {faAt} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form!: FormGroup;
  userIcon = faUser;
  pwIcon = faKey;
  emailIcon = faAt;
  player: Player | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private playerService: PlayerService,
  ) {
    playerService.getPlayerMetaData().subscribe((response) => this.player = response)
  }

  ngOnInit(): void {
  }

  public submit(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      (response: Player) => {
        console.log(response);
        this.player = player;
      },
    );
  }

}
