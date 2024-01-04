import { Injectable } from '@angular/core';

import { BehaviorSubject, take } from 'rxjs';
import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [];
  private videos: {}[] = [];
  private playlistIdAndTokenSubject = new BehaviorSubject<{
    playlistId: string;
    nextPageToken: string;
  }>(null);

  sendIdAndToken(data: { playlistId: string; nextPageToken: string }) {
    this.playlistIdAndTokenSubject.next(data);
  }

  getIdAndToken() {
    return this.playlistIdAndTokenSubject.asObservable().pipe(take(1));
  }

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

  addVideos(videos: {}[]) {
    if (this.videos.length > 0) {
      this.videos.splice(0, this.videos.length);
      videos.forEach((el) => {
        this.videos.push(el);
      });
    }
    if (this.videos.length === 0) {
      videos.forEach((el) => this.videos.push(el));
    }
  }
}
