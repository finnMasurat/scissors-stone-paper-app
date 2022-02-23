import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { PlayerService } from '../../player.service';
import {faKey} from '@fortawesome/free-solid-svg-icons'
import {faAt} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-solid-svg-icons'

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
  imageIcon = faImage;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private playerService: PlayerService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      imageUrl: ''
    });
  }

  submit(): void {
    this.playerService.updatePlayer(this.form?.getRawValue())
      .subscribe(() => this.router.navigate(['/login']));
  }
}
