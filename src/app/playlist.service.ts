import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [];
  private myPlaylistsIds = [];
  playlistIdSubject = new BehaviorSubject<string>(null);
  videoIdSubject = new BehaviorSubject<string>(null);

  constructor() {}

  getPlaylists() {
    return this.playlists.slice();
  }

  getPlaylistIds() {
    return this.myPlaylistsIds.slice();
  }

  addPlaylist(newPlaylist: Playlist) {
    this.playlists.push(newPlaylist);
    this.myPlaylistsIds.push(newPlaylist.id);
  }
}
