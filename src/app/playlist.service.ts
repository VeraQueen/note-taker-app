import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Playlist } from './my-playlists/playlists/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [
    // {
    //   name: 'Null revealed gaming',
    //   author: 'Revealed Gaming FANPAGE',
    //   numOfVideos: 11,
    //   id: 'bfebgebg',
    //   imgPath:
    //     'https://t3.ftcdn.net/jpg/02/33/17/50/360_F_233175040_hwqRyiZlQkXimeLz2AIZhajyfiU9El1m.jpg',
    // },
  ];
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
