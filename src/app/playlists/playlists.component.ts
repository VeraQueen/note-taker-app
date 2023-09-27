import { Component } from '@angular/core';
import { Playlist } from './playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent {
  playlists: Playlist[] = [
    {
      name: 'Angular and its many perks and love at first sight and all the other stuff',
      author: 'Fireship',
      numOfVideos: 5,
      imgPath:
        'https://www.mobilelive.ca/wp-content/uploads/2022/08/Angular_Banner.jpg',
    },
    {
      name: 'Automate YouTube Video Production with Ruby on Rails using the YouTube API',
      author: 'Fireship',
      numOfVideos: 5,
      imgPath:
        'https://miro.medium.com/v2/resize:fit:1400/1*_6ooq0R60ba3UT5c-QVemA.png',
    },
  ];
}
