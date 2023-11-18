import { EventEmitter, Injectable } from '@angular/core';

import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  // playlistAddedEmitter = new EventEmitter<Playlist[]>();
  private playlists: Playlist[] = [];
  private videos = [];

  constructor() {}

  getPlaylists() {
    return this.playlists.slice();
  }

  addPlaylist(newPlaylist: Playlist) {
    this.playlists.push(newPlaylist);
    // this.playlistAddedEmitter.emit(this.playlists.slice());
  }

  getVideos() {
    return this.videos.slice();
  }

  addVideos(videos: {}) {
    console.log(videos);
    if (this.videos.length > 0) {
      this.videos.splice(-1);
    }
    this.videos.push(videos);
    console.log(this.videos);
  }
}
