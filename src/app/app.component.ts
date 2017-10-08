import { Component } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(private websocketService: WebSocketService,
              private http: HttpClient) {
  }

  public signIn() {
    this.http.post('http://hidden-river-41453.herokuapp.com/api/player', {
      id: this.player.name,
      password: this.password
    })
      .subscribe((response: any) => {
        console.log('registered', response);

        this.playerRegistered = true;
        this.token = response.token;

        this.connect();
      });
  }

  public answer() {
    console.log(this.player.name);
    this.http.post('http://hidden-river-41453.herokuapp.com/api/game/play/answer', {
      playerId: this.player.name,
      answer: this.myAnswer
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
    const socket = this.websocketService.connect('ws://hidden-river-41453.herokuapp.com/', this.token);

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
