import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, map, switchMap, take } from 'rxjs';
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
  isLoading: boolean = false;
  error: boolean = null;
  playlistId: string;
  nextPageToken: string;
  videoIds: string[];
  videos: {}[];

  constructor(
    private playlistService: PlaylistService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.playlistService.playlistIdSubject
      .pipe(
        take(1),
        map((playlistId) => {
          return playlistId;
        }),
        switchMap((playlistId) => {
          this.playlistId = playlistId;
          this.isLoading = true;
          return this.httpService.getVideos(playlistId);
        })
      )
      .subscribe({
        next: (videosData: FetchVideosData) => {
          console.log(videosData);
          this.nextPageToken = videosData.nextPageToken;
          this.showButtonCheck(this.nextPageToken);
          this.filterVideos(videosData.items);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
        },
      });
  }

  onScroll() {
    if (this.nextPageToken !== undefined) {
      this.getVideosSub = this.httpService
        .getVideos(this.playlistId, this.nextPageToken)
        .subscribe({
          next: (videos: FetchVideosData) => {
            this.nextPageToken = videos.nextPageToken
              ? videos.nextPageToken
              : undefined;
            this.showButtonCheck(this.nextPageToken);
            this.filterVideos(videos.items);
          },
          error: (error) => {
            this.isLoading = false;
            this.error = error.message;
          },
        });
    }
  }

  onBack() {
    this.router.navigate(['/playlists']);
  }

  onHandleError() {
    this.error = null;
    this.onBack();
  }

  onPlayVideo(i: number) {
    const videoId = this.videoIds[i];
    this.playlistService.videoIdSubject.next(videoId);
    this.router.navigate(['/notes']);
  }

  private showButtonCheck(nextPageToken: string) {
    if (nextPageToken === undefined) this.showButton = true;
  }

  private filterVideos(videos: {}[]) {
    const filteredVideos: {}[] = [];
    const filteredVideoIds: string[] = [];
    videos.forEach((el: object) => {
      if (
        el['status'].privacyStatus === 'public' ||
        el['status'].privacyStatus === 'unlisted'
      ) {
        filteredVideoIds.push(el['snippet'].resourceId.videoId);
        filteredVideos.push(el);
      }
    });

    if (
      this.videoIds === undefined ||
      !this.videoIds ||
      this.videoIds.length === 0
    ) {
      this.videoIds = [...filteredVideoIds];
    } else {
      this.videoIds = [...this.videoIds, ...filteredVideoIds];
    }

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
