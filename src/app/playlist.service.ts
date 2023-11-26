import { EventEmitter, Injectable } from '@angular/core';

import { Playlist } from './my-playlists/playlists/playlist.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [];
  private videos = [];

  constructor() {}

  getPlaylists() {
    return this.playlists.slice();
  }

  addPlaylist(newPlaylist: Playlist) {
    this.playlists.push(newPlaylist);
  }

  getVideos() {
    return this.videos.slice();
  }

  addVideos(videos: {}) {
    if (this.videos.length > 0) {
      this.videos.splice(-1);
    }
    this.videos.push(videos);
  }
}
