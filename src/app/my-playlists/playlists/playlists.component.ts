import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { HttpFirebaseService } from 'src/app/http-firebase.service';
import { HttpYouTubeService } from 'src/app/http-youtube.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[] = [];
  getPlaylistsSub: Subscription;
  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private firebaseService: HttpFirebaseService,
    private httpService: HttpYouTubeService
  ) {}

  ngOnInit() {
    this.firebaseService.getPLaylists().then((playlists) => {
      playlists.forEach((playlist) => {
        this.getPlaylistsSub = this.httpService
          .getPlaylist(playlist.playlistId)
          .subscribe((data) => {
            const plName = data['items'][0].snippet.localized.title;
            const plAuthor = data['items'][0].snippet.channelTitle;
            const plNumVideos = data['items'][0].contentDetails.itemCount;
            const plImgPath = data['items'][0].snippet.thumbnails.medium.url;
            const plId = data['items'][0].id;
            const newPlaylist = new Playlist(
              plName,
              plAuthor,
              plNumVideos,
              plImgPath,
              plId
            );
            this.playlists.push(newPlaylist);
          });
      });
    });
  }

  onOpen(i: number) {
    const playlistId = this.playlists[i].id;
    this.playlistService.playlistIdSubject.next(playlistId);
    this.router.navigate(['/playlist']);
  }

  // onDelete(i: number) {
  //   this.playlistService.deletePlaylist(i);
  // }

  ngOnDestroy() {
    if (this.getPlaylistsSub) this.getPlaylistsSub.unsubscribe();
  }
}
