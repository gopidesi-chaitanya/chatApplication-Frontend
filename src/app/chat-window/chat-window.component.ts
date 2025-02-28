import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  imports: [CommonModule]
})

export class ChatWindowComponent implements OnInit, OnDestroy, OnChanges {
  storeMessages: { username: string; message: string }[] = [];

  @Input() messageData!: string;
  @Input() username!: string; // Get username from parent

  @ViewChild('messageList') messageList!: ElementRef; // Reference to message list

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Listen for incoming messages
    this.socketService.onMessage().subscribe((data) => {
      this.storeMessages.push(data);
      this.scrollToBottom(); // Scroll to bottom when new message is received
    });

    this.socketService.onGif().subscribe((data) => {
      console.log(data);
      this.storeMessages.push(data);
      this.scrollToBottom(); // Scroll to bottom when new gif is received
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messageData'] && this.messageData) {
      this.socketService.sendMessage(this.username, this.messageData);
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  // Function to scroll to the bottom
  private scrollToBottom() {
    setTimeout(() => {
      const messageList = this.messageList.nativeElement;
      messageList.scrollTop = messageList.scrollHeight;
    }, 0);
  }
}
