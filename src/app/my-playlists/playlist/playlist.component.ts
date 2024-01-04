import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { FetchVideosData, HttpService } from 'src/app/http.service';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  getIdAndTokenSub: Subscription;
  getVideosSub: Subscription;
  showButton: boolean = false;
  playlistId: string;
  nextPageToken: string;
  videos: {}[];

  constructor(
    private playlistService: PlaylistService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filterVideos(this.playlistService.getVideos());
    this.getIdAndTokenSub = this.playlistService
      .getIdAndToken()
      .subscribe((data: { playlistId: string; nextPageToken: string }) => {
        this.playlistId = data?.playlistId;
        this.nextPageToken = data?.nextPageToken;
        if (this.nextPageToken === undefined) this.showButton = true;
      });
  }

  onScroll() {
    if (this.nextPageToken !== undefined) {
      this.getVideosSub = this.httpService
        .getVideos(this.playlistId, this.nextPageToken)
        .subscribe((videos: FetchVideosData) => {
          this.nextPageToken = videos.nextPageToken
            ? videos.nextPageToken
            : undefined;
          if (this.nextPageToken === undefined) this.showButton = true;
          this.filterVideos(videos.items);
        });
    }
  }

  onBack() {
    this.router.navigate(['/playlists']);
  }

  private filterVideos(videos: {}[]) {
    const filteredVideos: {}[] = [];
    videos.forEach((el: Object) => {
      if (
        el['status'].privacyStatus === 'public' ||
        el['status'].privacyStatus === 'unlisted'
      ) {
        filteredVideos.push(el);
      }
    });

    if (this.videos === undefined || !this.videos || this.videos.length === 0) {
      this.videos = [...filteredVideos];
    } else {
      this.videos = [...this.videos, ...filteredVideos];
    }
  }

  ngOnDestroy() {
    if (this.getIdAndTokenSub) this.getIdAndTokenSub.unsubscribe();
    if (this.getVideosSub) this.getVideosSub.unsubscribe();
  }
}
