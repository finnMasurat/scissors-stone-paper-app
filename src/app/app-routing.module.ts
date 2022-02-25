import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RandomGuard } from './auth/guards/random.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { GameComponent } from './components/game/game.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [RandomGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [RandomGuard]},
  {path: 'game', component: GameComponent, canActivate: [RandomGuard]},
  {path: 'stats', component: StatsComponent, canActivate: [RandomGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
