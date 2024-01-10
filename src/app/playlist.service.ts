import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [];
  idSubject = new BehaviorSubject<string>(null);

  constructor() {}

  getPlaylists() {
    return this.playlists.slice();
  }

  addPlaylist(newPlaylist: Playlist) {
    this.playlists.push(newPlaylist);
  }
}
