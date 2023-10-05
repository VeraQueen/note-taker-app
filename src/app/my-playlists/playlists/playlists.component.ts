import { Component, OnInit } from '@angular/core';
import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit {
  playlistIds = [];
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
      author: 'fireship',
      numOfVideos: 5,
      imgPath:
        'https://miro.medium.com/v2/resize:fit:1400/1*_6ooq0R60ba3UT5c-QVemA.png',
    },
  ];

  constructor(
    private playlistService: PlaylistService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.playlistService.playlistIdEmitter.subscribe((playlistIdString) => {
      this.playlistIds.push(playlistIdString);
      this.getPlaylist();
    });
  }

  private getPlaylist() {
    for (const [i, el] of this.playlistIds.entries()) {
      const url = 'https://www.googleapis.com/youtube/v3/playlists';
      const urlParams = new HttpParams()
        .set('part', 'snippet, contentDetails')
        .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
        .set('id', el);

      const options = { params: urlParams };

      this.http.get(url, options).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
