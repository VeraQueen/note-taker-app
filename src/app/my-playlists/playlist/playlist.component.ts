import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  videos = [];
  constructor(
    private playlistService: PlaylistService,
    private router: Router
  ) {}
  ngOnInit() {
    this.videos = this.playlistService.getVideos();
    console.log(this.videos[0].videos);
    // console.log(this.videos[0].videos[0].snippet.thumbnails.standard);
  }

  onBack() {
    this.router.navigate(['/playlists']);
  }

  ngOnDestroy() {}
}
