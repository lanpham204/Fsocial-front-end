import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Subject } from 'rxjs';
// import SockJS from 'sockjs-client';
import AccountResponse from '../model/AccounResponse';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: any;
  private notificationSubject = new Subject<AccountResponse>();
  private messageSubject: BehaviorSubject<AccountResponse[]> =
    new BehaviorSubject<AccountResponse[]>([]);
  constructor() {
    this.initConnectionSocket();
  }
  initConnectionSocket() {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }
  joinRoom() {
  // debugger
  this.stompClient.connect({}, () => {
    console.log('Connected to WebSocket');
    this.stompClient.subscribe(`/topic/notification`, (messages: any) => {
      console.log('Received message:', messages);
      const messageContent = JSON.parse(messages.body);
      console.log('Parsed message content:', messageContent);
      this.messageSubject.next(messageContent);
    }, (error: any) => {
      console.error('Subscription error:', error);
    });
  }, (error: any) => {
    console.error('Connection error:', error);
  });
} 
  getMessageSubject() {
    return this.notificationSubject.asObservable();
  }

  // constructor() { }
}
