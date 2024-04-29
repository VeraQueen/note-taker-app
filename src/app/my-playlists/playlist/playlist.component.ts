import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/auth/user.model';
import { FirestoreService } from 'src/app/firestore.service';
import { FetchVideosData, YouTubeService } from 'src/app/youtube.service';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  private getIdAndTokenSub: Subscription;
  private getVideosSub: Subscription;
  showButton: boolean = false;
  isLoading: boolean = false;
  error: boolean = null;
  playlistId: string;
  nextPageToken: string;
  watchedVideoIds: string[];
  videoIds: string[];
  videos: {}[];
  user: User;

  constructor(
    private playlistService: PlaylistService,
    private youtubeService: YouTubeService,
    private router: Router,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.getVideosSub = this.playlistService.playlistIdSubject
        .pipe(
          take(1),
          switchMap((playlistId) => {
            this.isLoading = true;
            const sessionStoragePLaylistId: string = JSON.parse(
              sessionStorage.getItem('playlistId')
            );
            if (playlistId) {
              this.playlistId = playlistId;
              this.getWatchedVideos();
              return this.youtubeService.getVideos(playlistId);
            } else if (!playlistId && sessionStoragePLaylistId !== null) {
              this.playlistId = sessionStoragePLaylistId;
              this.getWatchedVideos();
              return this.youtubeService.getVideos(sessionStoragePLaylistId);
            }
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
    });
  }

  onScroll() {
    if (this.nextPageToken !== undefined) {
      this.getVideosSub = this.youtubeService
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

  onPlayVideo(i: number) {
    const videoId = this.videoIds[i];
    this.playlistService.videoIdSubject.next(videoId);
    this.playlistService.playlistIdSubject.next(this.playlistId);
    this.firestoreService.addVideoNotesCol(this.playlistId, videoId, this.user);
    sessionStorage.setItem('videoId', JSON.stringify(videoId));
    this.router.navigate(['/notes']);
  }

  onRemoveFromWatched(i: number) {
    this.firestoreService.removeFromWatched(
      this.videos[i]['snippet'].resourceId.videoId,
      this.playlistId,
      this.user
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
    this.firestoreService
      .getWatchedVideoIds(this.playlistId, this.user)
      .then((data) => {
        this.watchedVideoIds = data.data()?.watchedVideoIds ?? [];
      });
  }

  private checkWatched() {
    if (this.watchedVideoIds === undefined) {
      this.getWatchedVideos();
      this.reloadCurrentRoute();
    } else {
      this.videos.forEach((video) => {
        video['watched'] = false;
        this.watchedVideoIds.forEach((el) => {
          if (el === video['snippet'].resourceId.videoId) {
            video['watched'] = true;
          }
        });
      });
    }
  }

  private reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ngOnDestroy() {
    if (this.getIdAndTokenSub) this.getIdAndTokenSub.unsubscribe();
    if (this.getVideosSub) this.getVideosSub.unsubscribe();
  }
}
