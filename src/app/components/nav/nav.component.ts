import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    authService.isAuthenticatedSub.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
