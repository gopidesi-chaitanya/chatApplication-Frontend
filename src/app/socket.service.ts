import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  username : any
  private socket!: Socket;
  private readonly SERVER_URL = 'https://chatapplication-backend-mqj0.onrender.com/'; // Replace with your server URL

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  // Emit an event with username and message
  sendMessage(username: string, message: string) {
    this.socket.emit('chat-message', { username, message });
  }

  // Listen for messages from the server
  onMessage(): Observable<{ username: string; message: string }> {
    return new Observable((observer) => {
      this.socket.on('chat-message', (data) => {
        observer.next(data);
      });

      // Cleanup on unsubscribe
      return () => {
        this.socket.off('chat-message');
      };
    });
  }


 // Listen for messages from the server
 onGif(): Observable<{ username: string; message: string }> {
  return new Observable((observer) => {
    this.socket.on('send-gif', (data) => {
      observer.next(data);
    });

    // Cleanup on unsubscribe
    return () => {
      this.socket.off('chat-message');
    };
  });
}


  SetGifUrl(message:string){
    this.socket.emit('send-gif', { username: this.username, message });
  }

  // Disconnect the socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
