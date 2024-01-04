import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { FetchVideosData, HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[] = [];
  getVideosSub: Subscription;
  constructor(
    private playlistService: PlaylistService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
  }

  onOpen(i: number) {
    const playlistId = this.playlists[i].id;
    this.getVideosSub = this.httpService
      .getVideos(playlistId)
      .subscribe((videos: FetchVideosData) => {
        this.playlistService.sendIdAndToken({
          playlistId: playlistId,
          nextPageToken: videos.nextPageToken,
        });
        this.playlistService.addVideos(videos.items);
        this.router.navigate(['/playlist']);
      });
  }

  ngOnDestroy() {
    if (this.getVideosSub) this.getVideosSub.unsubscribe();
  }
}
