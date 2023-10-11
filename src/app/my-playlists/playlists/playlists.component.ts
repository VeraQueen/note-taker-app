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
  playlists: Playlist[];

  constructor(
    private playlistService: PlaylistService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    this.playlistService.playlistIdEmitter.subscribe((playlistIdString) => {
      this.getPlaylist(playlistIdString);
    });
  }

  private getPlaylist(id: string) {
    const url = 'https://www.googleapis.com/youtube/v3/playlists';
    const urlParams = new HttpParams()
      .set('part', 'snippet, contentDetails')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('id', id);

    const options = { params: urlParams };

    this.http.get(url, options).subscribe((data) => {
      const plName = data['items'][0].snippet.localized.title;
      const plAuthor = data['items'][0].snippet.channelTitle;
      const plNumVideos = data['items'][0].contentDetails.itemCount;
      const plImgPath = data['items'][0].snippet.thumbnails.default.url;
      const newPlaylist = new Playlist(
        plName,
        plAuthor,
        plNumVideos,
        plImgPath
      );
      this.playlistService.addPlaylist(newPlaylist);
    });
  }
}
