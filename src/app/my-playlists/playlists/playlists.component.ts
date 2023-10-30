import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { Observable, Subscribable, Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[];
  subscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    this.playlistService.playlistAddedEmitter.subscribe((playlists) => {
      this.playlists = playlists;
    });
    this.subscription = this.playlistService.playlistIdEmitter.subscribe(
      (playlistIdString) => {
        console.log('emitted');
        this.getPlaylist(playlistIdString);
        this.subscription.unsubscribe();
        this.router.navigate(['/playlists']);
      }
    );
  }

  private getPlaylist(id: string) {
    const url = 'https://www.googleapis.com/youtube/v3/playlists';
    const urlParams = new HttpParams()
      .set('part', 'snippet, contentDetails')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('id', id);

    const options = { params: urlParams };

    this.http.get(url, options).subscribe((data) => {
      console.log(data);
      const plName = data['items'][0].snippet.localized.title;
      const plAuthor = data['items'][0].snippet.channelTitle;
      const plNumVideos = data['items'][0].contentDetails.itemCount;
      const plImgPath = data['items'][0].snippet.thumbnails.high.url;
      const newPlaylist = new Playlist(
        plName,
        plAuthor,
        plNumVideos,
        plImgPath
      );
      this.playlistService.addPlaylist(newPlaylist);
    });
  }

  ngOnDestroy() {}
}
