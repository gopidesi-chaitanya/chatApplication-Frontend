import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sendmessage',
  imports: [FormsModule],
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css'] // Fixed typo here
})
export class SendmessageComponent {
  message = "";

  // EventEmitter to emit the message
  @Output() messageData: EventEmitter<string> = new EventEmitter<string>();

  OnSend() {
    console.log(this.message);
    this.messageData.emit(this.message); // Emit the message data
    this.message = ""; // Clear the message after sending
  }

}
