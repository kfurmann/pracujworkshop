import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import ioClient from 'socket.io-client';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ISocketMessage } from '../interfaces/message';

@Injectable()
export class WebSocketService {

  constructor() { }

  public connect(url: string, token: string = null): Observable<ISocketMessage> {
    // return this.create(url, token);

    return this.createConnection(url);
  }

  private createConnection(url: string): Observable<ISocketMessage> {
    const socket = ioClient.connect(url);

    const messageSubject: ReplaySubject<ISocketMessage> = new ReplaySubject<ISocketMessage>();

    socket.on('message', (data) => {
      messageSubject.next(data);
    });

    return messageSubject.asObservable();
  }
}
