import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, catchError, throwError } from 'rxjs';

import { FetchPlaylistsData, HttpService } from '../http.service';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../my-playlists/playlists/playlist.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchPlaylistsSub: Subscription;
  getAndAddPlaylistSub: Subscription;
  searchObs: Observable<FetchPlaylistsData>;
  isLoading = false;
  showMsg: boolean = false;
  error: string = null;
  searchForm: FormGroup;
  searchInputValue: string;
  nextPageToken: string;
  playlists: [];

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
    this.playlists = [];
    this.searchInputValue = this.searchForm.get('searchInput').value;
    this.searchObs = this.httpService.fetchPlaylists(this.searchInputValue);
    this.searchObsSubscribe();
  }

  onScroll() {
    this.isLoading = true;
    if (this.nextPageToken !== undefined) {
      this.searchObs = this.httpService.fetchPlaylists(
        this.searchInputValue,
        this.nextPageToken
      );
      this.searchObsSubscribe();
    }
  }

  onAdd(id: number) {
    const playlistId = this.playlists[id]['id']['playlistId'];
    this.getAndAddPlaylistSub = this.httpService
      .getPlaylist(playlistId)
      .subscribe((data) => {
        const plName = data['items'][0].snippet.localized.title;
        const plAuthor = data['items'][0].snippet.channelTitle;
        const plNumVideos = data['items'][0].contentDetails.itemCount;
        const plImgPath = data['items'][0].snippet.thumbnails.medium.url;
        const plId = data['items'][0].id;
        const newPlaylist = new Playlist(
          plName,
          plAuthor,
          plNumVideos,
          plImgPath,
          plId
        );
        this.playlistService.addPlaylist(newPlaylist);
      });
  }

  ngOnDestroy(): void {
    if (this.searchPlaylistsSub) this.searchPlaylistsSub.unsubscribe();
    if (this.getAndAddPlaylistSub) this.getAndAddPlaylistSub.unsubscribe();
  }

  private searchObsSubscribe() {
    this.searchPlaylistsSub = this.searchObs.subscribe(
      (playlists) => {
        this.nextPageToken = playlists.nextPageToken
          ? playlists.nextPageToken
          : undefined;
        if (this.nextPageToken === undefined) this.showMsg = true;
        if (this.playlists === undefined) {
          this.playlists = [...playlists.items];
        } else {
          this.playlists = [...this.playlists, ...playlists.items];
        }
        this.isLoading = false;
      },
      (error) => {
        // console.log(error.message);
        this.error = error.message;
      }
    );
  }
}
