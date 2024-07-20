import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private url = 'https://jpvsq7-176-208-23-222.ru.tuna.am/ws';
  private wsServer!: WebSocket;
  private lastMessage: Subject<string> = new Subject();

  constructor() { }

  public connectNewUser(userName: string): void {
    this.wsServer = new WebSocket(`${this.url}?name=${userName}`);

    this.wsServer.onopen = (e) => {
      console.log(e, 'Соединение открыто');
    }

    this.wsServer.onmessage = (e) => {
      this.lastMessage.next(e.data)
    }

    this.wsServer.onclose = (e) => {
      console.log('onClose', e.wasClean, e.code, 'reason -', e.reason)
    }

    this.wsServer.onerror = (error) => {
      console.log('onError', error)
    }
  }

  public subscribeToMessage(): Subject<string> {
    return this.lastMessage;
  }

  public sendMessage(message: string): void {
    this.wsServer.send(message);
  }
}
