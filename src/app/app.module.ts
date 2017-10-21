import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebSocketService } from '../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeModule } from './time/time.module';
import { GameComponent } from './game/game.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PlayerService } from './player.service';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    TimeModule
  ],
  providers: [
    WebSocketService,
    PlayerService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
