import { Component } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketMessageTypes } from '../interfaces/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public password = '';

  public player = {
    name: ''
  };

  public playerRegistered = false;

  public players: any[] = [];
  public game: any;
  public archivedGames: any[] = [];
  public token = '';
  public myAnswer: string;

  private URL = 'http://localhost:3000/api';
  private wsURL= 'ws://localhost:3000';
  private secureHeaders = new HttpHeaders();

  constructor(private websocketService: WebSocketService,
              private http: HttpClient) {
  }

  public signIn() {
    this.http.post(this.URL + '/player', {
      id: this.player.name,
      password: this.password
    })
      .subscribe((response: any) => {
        console.log('registered', response);

        this.playerRegistered = true;
        this.token = response.token;

        this.secureHeaders = this.secureHeaders.set('Authorization', 'Bearer ' + this.token);

        this.connect();
      });
  }

  public answer() {
    console.log(this.player.name, this.secureHeaders);
    this.http.post(this.URL + '/game/play/answer', {
      playerId: this.player.name,
      answer: this.myAnswer
    }, {
      headers: this.secureHeaders
    }).subscribe((response: any) => {
      console.log('answered?', response);
    });

    this.game.plays.forEach((play) => {
      if (play.playerId === this.player.name) {
        play.answer = this.myAnswer;
      }
    });
  }

  private connect() {
    const socket = this.websocketService.connect(this.wsURL, this.token);

    socket.subscribe((message) => {
      if (message.type === SocketMessageTypes.PLAYER) {
        console.log('players!', message);
        this.players = message.body.players;
      } else if (message.type === SocketMessageTypes.GAME) {
        console.log('new game!', message);
        if (this.game) {
          this.archivedGames.unshift(this.game);
        }
        this.game = message.body.game;
        this.game.endsOn = new Date(this.game.endsOn);
        this.myAnswer = '';
      } else if (message.type === SocketMessageTypes.SOLUTION) {
        if (this.game) {
          this.game.solved = true;
          this.game.plays = message.body.game.plays;
        }
      }
    });
  }
}
