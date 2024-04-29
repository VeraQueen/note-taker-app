import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';

import { FetchPlaylistsData, YouTubeService } from '../youtube.service';
import { FirestoreService } from '../firestore.service';
import { User } from '../auth/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private searchPlaylistsSub: Subscription;
  private getPlaylistsFireSub: Subscription;
  searchObs: Observable<FetchPlaylistsData>;
  isLoading: boolean = false;
  showMsg: boolean = false;
  error: string = null;
  searchForm: FormGroup;
  searchInputValue: string;
  nextPageToken: string;
  playlists: object[];
  playlistIds: string[] = [];
  user: User;

  constructor(
    private youtubeService: YouTubeService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null, Validators.required),
    });
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.getPlaylistsFireSub = this.firestoreService
        .getPlaylists(user)
        .subscribe((data) => {
          {
            data.forEach((playlist) => {
              this.playlistIds.push(playlist.playlistId);
            });
          }
        });
    });
  }

  onSearch() {
    this.isLoading = true;
    this.playlists = [];
    this.searchInputValue = this.searchForm.get('searchInput').value;
    this.searchObs = this.youtubeService.fetchPlaylists(this.searchInputValue);
    this.searchObsSubscribe();
  }

  onScroll() {
    this.isLoading = true;
    if (this.nextPageToken !== undefined) {
      this.searchObs = this.youtubeService.fetchPlaylists(
        this.searchInputValue,
        this.nextPageToken
      );
      this.searchObsSubscribe();
    }
  }

  onAdd(id: number) {
    this.playlists[id]['added'] = true;
    const playlistId = this.playlists[id]['id']['playlistId'];
    this.firestoreService.savePlaylist(playlistId, this.user);
  }

  ngOnDestroy(): void {
    if (this.searchPlaylistsSub) this.searchPlaylistsSub.unsubscribe();
    if (this.getPlaylistsFireSub) this.getPlaylistsFireSub.unsubscribe();
  }

  private searchObsSubscribe() {
    this.searchPlaylistsSub = this.searchObs.subscribe({
      next: (playlists) => {
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
        this.playlists.forEach((el: any) => {
          this.playlistIds.forEach((myPlEl) => {
            if (el['id']['playlistId'] === myPlEl) {
              el['existing'] = true;
            }
          });
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
      },
    });
  }
}
