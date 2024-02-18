import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private myPlaylistsIds = [];
  playlistIdSubject = new BehaviorSubject<string>(null);
  videoIdSubject = new BehaviorSubject<string>(null);

  constructor() {}

  getPlaylistsIds() {
    return this.myPlaylistsIds.slice();
  }

  addPlaylistId(playlistId: string) {
    this.myPlaylistsIds.push(playlistId);
  }

  deletePlaylist(playlistId: string) {
    this.myPlaylistsIds.forEach((el) => {
      if (el === playlistId) {
        this.myPlaylistsIds.splice(el, 1);
      }
    });
  }
}
