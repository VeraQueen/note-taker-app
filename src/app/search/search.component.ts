import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { PlaylistService } from '../playlist.service';
import { HttpService } from '../http.service';
import { Playlist } from '../my-playlists/playlists/playlist.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchPlaylistsSub: Subscription;
  getAndAddPlaylistSub: Subscription;
  searchForm: FormGroup;
  isLoading = false;
  playlists: any = {};

  constructor(
    private httpService: HttpService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null, Validators.required),
    });
  }

  onSearch() {
    this.isLoading = true;
    const searchInputValue = this.searchForm.get('searchInput').value;
    this.searchPlaylistsSub = this.httpService
      .fetchPlaylists(searchInputValue)
      .subscribe((playlists) => {
        this.playlists = playlists;
        this.isLoading = false;
      });
  }

  onAdd(id: number) {
    const playlistId = this.playlists.items[id].id.playlistId;
    // console.log('add btn clicked', 'id:', playlistId);

    this.getAndAddPlaylistSub = this.httpService
      .getPlaylist(playlistId)
      .subscribe((data) => {
        console.log(data);
        const plName = data['items'][0].snippet.localized.title;
        const plAuthor = data['items'][0].snippet.channelTitle;
        const plNumVideos = data['items'][0].contentDetails.itemCount;
        const plImgPath = data['items'][0].snippet.thumbnails.high.url;
        const newPlaylist = new Playlist(
          plName,
          plAuthor,
          plNumVideos,
          plImgPath
        );
        this.playlistService.addPlaylist(newPlaylist);
      });
  }

  ngOnDestroy(): void {
    if (this.searchPlaylistsSub) this.searchPlaylistsSub.unsubscribe();
    if (this.getAndAddPlaylistSub) this.getAndAddPlaylistSub.unsubscribe();
  }
}
