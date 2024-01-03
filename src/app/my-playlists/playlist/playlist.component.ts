import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from 'src/app/http.service';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlistId: string;
  nextPageToken: string;
  videos: {}[];

  constructor(
    private playlistService: PlaylistService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ngOnInit called 🖤🤎🖤🤎');
    this.filterVideos(this.playlistService.getVideos());
    this.playlistService.getData().subscribe((data) => {
      this.playlistId = data?.playlistId;
      this.nextPageToken = data?.nextPageToken;
    });
  }

  onScroll() {
    if (this.nextPageToken !== undefined) {
      this.httpService
        .getVideos(this.playlistId, this.nextPageToken)
        .subscribe((videos) => {
          this.nextPageToken = videos.nextPageToken
            ? videos.nextPageToken
            : undefined;
          this.filterVideos(videos.items);
        });
    }
  }

  onBack() {
    this.router.navigate(['/playlists']);
  }

  private filterVideos(videos) {
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

  ngOnDestroy() {}
}
