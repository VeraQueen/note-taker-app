import { Component, OnDestroy, OnInit } from '@angular/core';

import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';

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
    this.httpService.getVideos(playlistId).subscribe((data) => {
      const filteredVideos = [];
      data['items'].forEach((el: any) => {
        if (
          el.status.privacyStatus === 'public' ||
          el.status.privacyStatus === 'unlisted'
        ) {
          filteredVideos.push(el);
        }
      });

      const playlistVideos = {
        nextPageToken: data['nextPageToken'],
        videos: filteredVideos,
      };
      this.playlistService.addVideos(playlistVideos);
      this.router.navigate(['/playlist']);
    });
  }

  ngOnDestroy(): void {}
}
