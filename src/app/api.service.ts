import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { WebSocketService } from '../services/websocket.service';
import { SocketMessageTypes } from '../interfaces/message';

@Injectable()
export class ApiService {

  private URL = 'http://localhost:3000/api';
  private wsURL = 'ws://localhost:3000';
  private secureHeaders = new Headers();

  public token = '';

  public players: any[] = [];
  public game: any;
  public archivedGames: any[] = [];
  public myAnswer: string;

  public player: any = {
    name: ''
  };

  constructor(private http: Http,
              private websocketService: WebSocketService) {
  }

  public signIn(name, password): Observable<any> {

    return this.http.post(this.URL + '/player', {
      id: name,
      password: password
    })
      .do((response) => {

        const body = response.json();

        this.token = body.token;
        this.player = {
          name: name
        };
        this.secureHeaders.set('Authorization', 'Bearer ' + this.token);
      });
  }

  public answer() {
    this.http.post(this.URL + '/game/play/answer', {
      playerId: this.player.name,
      answer: this.myAnswer
    }, {
      headers: this.secureHeaders
    }).subscribe((response: any) => {
      //
    });

    this.game.plays.forEach((play) => {
      if (play.playerId === this.player.name) {
        play.answer = this.myAnswer;
      }
    });
  }


  public connect() {
    const socket = this.websocketService.connect(this.wsURL, this.token);

    socket.subscribe((message) => {
      if (message.type === SocketMessageTypes.PLAYER) {

        this.players = message.body.players;
      } else if (message.type === SocketMessageTypes.GAME) {

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
