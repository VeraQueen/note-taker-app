import { Component, OnDestroy, OnInit } from '@angular/core';

import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { HttpService } from 'src/app/http.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[] = [];

  constructor(
    private playlistService: PlaylistService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    // console.log(this.playlists);
    // this.playlistService.playlistAddedEmitter.subscribe((playlists) => {
    //   this.playlists = playlists;
    // });
  }

  onOpen(i: number) {
    const playlistId = this.playlists[i].id;
    this.httpService.getVideos(playlistId).subscribe((data) => {
      const playlistVideos = {
        nextPageToken: data['nextPageToken'],
        videos: data['items'],
      };
      this.playlistService.addVideos(playlistVideos);
    });
  }

  ngOnDestroy(): void {}
}
