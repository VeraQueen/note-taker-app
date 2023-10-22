import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  playlistIdEmitter = new Subject<string>();
  playlistAddedEmitter = new EventEmitter<Playlist[]>();
  private playlists: Playlist[] = [];

  getPlaylists() {
    console.log(this.playlists.slice());
    return this.playlists.slice();
  }

  addPlaylist(playlist: Playlist) {
    this.playlists.push(playlist);
    console.log('added');
    this.playlistAddedEmitter.emit(this.playlists.slice());
  }
}
