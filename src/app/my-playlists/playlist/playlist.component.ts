import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  videos = [];
  constructor(private playlistService: PlaylistService) {}
  ngOnInit() {
    console.log(this.playlistService.getVideos());
    // this.videos = this.playlistService.getVideos();
  }
}
