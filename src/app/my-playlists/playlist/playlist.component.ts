import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, map, switchMap, take } from 'rxjs';
import { HttpFirebaseService } from 'src/app/http-firebase.service';
import {
  FetchVideosData,
  HttpYouTubeService,
} from 'src/app/http-youtube.service';
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
  watchedVideoIds: string[];
  videoIds: string[];
  videos: {}[];

  constructor(
    private playlistService: PlaylistService,
    private httpService: HttpYouTubeService,
    private router: Router,
    private firebaseService: HttpFirebaseService
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
          this.nextPageToken = videosData.nextPageToken;
          this.showButtonCheck(this.nextPageToken);
          this.filterVideos(videosData.items);
          this.checkWatched();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
        },
      });
    this.getWatchedVideos();
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
            this.checkWatched();
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
    console.log(this.playlistId, videoId);
    this.playlistService.videoIdSubject.next(videoId);
    this.playlistService.playlistIdSubject.next(this.playlistId);
    this.firebaseService.addVideoNotesCol(this.playlistId, videoId);
    this.router.navigate(['/notes']);
  }

  onRemoveFromWatched(i: number) {
    this.firebaseService.removeFromWatched(
      this.videos[i]['snippet'].resourceId.videoId,
      this.playlistId
    );
    this.getWatchedVideos();
    this.checkWatched();
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

  private getWatchedVideos() {
    this.firebaseService.getWatchedVideoIds(this.playlistId).then((data) => {
      this.watchedVideoIds = data.data().watchedVideoIds;
      if (this.watchedVideoIds === undefined) this.watchedVideoIds = [];
    });
  }

  private checkWatched() {
    this.watchedVideoIds.forEach((el) => {
      this.videos.forEach((video) => {
        if (el === video['snippet'].resourceId.videoId) {
          video['watched'] = true;
        } else {
          video['watched'] = false;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.getIdAndTokenSub) this.getIdAndTokenSub.unsubscribe();
    if (this.getVideosSub) this.getVideosSub.unsubscribe();
  }
}
