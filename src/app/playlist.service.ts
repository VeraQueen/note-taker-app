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

  getPlaylistIds() {
    return this.myPlaylistsIds.slice();
  }

  addPlaylistId(playlistId: string) {
    this.myPlaylistsIds.push(playlistId);
  }

  // deletePlaylist(i: number) {
  //   this.myPlaylistsIds.splice(i, 1);
  // }
}
