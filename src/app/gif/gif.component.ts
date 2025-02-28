import { SocketService } from './../socket.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { GifResponse } from './gif.model';

@Component({
  selector: 'app-gif',
  standalone: true, // Mark as a standalone component
  imports: [FormsModule], // Add HttpClientModule here
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})

export class GifComponent {

  term: string = "";  // No need for "?" if initialized
  gifUrls: GifResponse[] = [];

  GIFCategories: any[] = []; // Specify a valid type or use "any[]"

  constructor(private http: HttpClient,private socketService : SocketService) {}

  // Fetch GIFs based on user search
  GetGifs() {
    const url = `https://tenor.googleapis.com/v2/search?q=${this.term}&key=AIzaSyCO-UVRdhH7IbP_3jGBk4eGtAVvqe9ifhc&client_key=my_test_app&limit=70`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.gifUrls = response.results;
        console.log('GIF Results:', response.results);
        this.term = ""
      },
      error: (err) => console.error('Failed to fetch GIFs:', err),
      complete : ()=>console.log("completed")
    });
  }

  SetGifUrl(url :string){
    this.socketService.SetGifUrl(url)
  }

}
