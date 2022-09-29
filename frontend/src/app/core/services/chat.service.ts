import {Injectable} from "@angular/core";
import {io, Socket} from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  socket: Socket;
  url = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.socket.on(eventName, (data: string) => {
        subscriber.next(data);
        subscriber.complete();
      });
    });
  }

  async joinRoom(user: string) {
    this.socket.emit('join', user);
    return await this.listen('joinMsg').toPromise();
  }

  sendMessage(user: string, message: string) {
    this.socket.emit('message', {user, message});
  }

  getMessage(): Observable<{user: string, message: string}> {
    return new Observable<{user: string, message: string}>((subscriber) => {
      this.socket.on('newMessage', (data) => {
        subscriber.next(data);
      });
    });
  }

  leaveChat() {
    this.socket.disconnect();
  }

  joinMessage(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.socket.on('joinMsg', (data) => {
        console.log('there');
        subscriber.next(data);
      });
    });
  }
}
