import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    this.playlistService.playlistsChanged.subscribe((playlists) => {
      this.playlists = playlists;
    });
  }

  onOpen(i: number) {
    const playlistId = this.playlists[i].id;
    this.playlistService.playlistIdSubject.next(playlistId);
    this.router.navigate(['/playlist']);
  }

  onDelete(i: number) {
    this.playlistService.deletePlaylist(i);
  }

  ngOnDestroy() {
    if (this.getVideosSub) this.getVideosSub.unsubscribe();
  }
}
