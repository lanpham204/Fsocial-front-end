import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import AccountResponse from '../../model/AccounResponse';
import { log } from 'console';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(){}
  // constructor(private notificationService: NotificationService) {}
  // ngOnInit() {
  //   this.notificationService.joinRoom();
  //   // this.listenerMessage();
  // }
  // listenerMessage() {
  //   this.notificationService
  //     .getMessageSubject()
  //     .subscribe((accountResponse: AccountResponse) => {
  //       log(accountResponse);
  //       // this.messageList.push(chatRoom);
  //     });
  // }
  
}
