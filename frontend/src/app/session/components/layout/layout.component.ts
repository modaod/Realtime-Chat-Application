import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../core/services/chat.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  messageArray: {user: string; message: string}[] = [];
  messageText = '';
  joinMsg: any;
  user: any;
  room = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((data) => {
      console.log('ngOnit: ' + data.user + ' : ' + data.message);
      this.messageArray.push(data);
    });
  }

  async sendMessage() {
    await this.chatService.sendMessage(this.user, this.messageText);
  }

  async join() {
    this.joinMsg = await this.chatService.joinRoom(this.user);
    // this.messageArray = await this.chatService.sendMessage(this.user);
  }

  onLeave() {
    this.chatService.leaveChat();
  }

  search() {

  }
}
