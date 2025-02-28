import { SocketService } from './socket.service';
import { Socket } from 'socket.io-client';
import { Component } from '@angular/core';

import { SendmessageComponent } from "./sendmessage/sendmessage.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { GifComponent } from './gif/gif.component';

@Component({
  selector: 'app-root',
  imports: [SendmessageComponent, ChatWindowComponent,GifComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  username:any
  constructor(private socketService :SocketService) {

  }
  ngOnInit(){
   let name  =  prompt("enter the user name")
    this.username =name

    this.socketService.username = name
  }

  message  = ""
  HandleSendMessage(message :string){
    this.message = message
  }
}
