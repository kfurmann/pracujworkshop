import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { GamePageComponent } from './game-page/game-page.component';
import { GameComponent } from './game/game.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlayerService } from './player.service';
import { TimeModule } from './time/time.module';

const appRoutes: Routes = [
  {path: 'rejestracja', component: LoginPageComponent},
  {path: 'gra', component: GamePageComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '/rejestracja'}
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginFormComponent,
    LoginPageComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    TimeModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true})
  ],
  providers: [
    WebSocketService,
    PlayerService,
    ApiService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
