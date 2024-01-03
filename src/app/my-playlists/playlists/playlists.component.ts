import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[] = [];
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
    this.httpService.getVideos(playlistId).subscribe((videos) => {
      this.playlistService.sendData({
        playlistId: playlistId,
        nextPageToken: videos.nextPageToken,
      });
      this.playlistService.addVideos(videos.items);
      this.router.navigate(['/playlist']);
    });
  }

  ngOnDestroy() {}
}
