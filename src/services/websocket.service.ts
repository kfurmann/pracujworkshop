import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import ioClient from 'socket.io-client';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ISocketMessage } from '../interfaces/message';

@Injectable()
export class WebSocketService {

  constructor() {
  }

  public connect(url: string, token: string = null): Observable<ISocketMessage> {

    return this.createConnection(url, token);
  }

  private createConnection(url: string, token: string): Observable<ISocketMessage> {

    console.log(url);
    const socket = ioClient.connect(url, {
      query: 'token=' + token
    });

    const messageSubject: ReplaySubject<ISocketMessage> = new ReplaySubject<ISocketMessage>();

    socket.on('message', (data) => {
      messageSubject.next(data);
    });

    socket.on('error', (error) => {
      messageSubject.error(error);
    });

    return messageSubject.asObservable();
  }
}
