import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Playlist } from './playlist.model';
import { PlaylistService } from 'src/app/playlist.service';
import { HttpFirebaseService } from 'src/app/http-firebase.service';
import { HttpYouTubeService } from 'src/app/http-youtube.service';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/auth/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  getPlaylistsSub: Subscription;
  getFirestorePlaylistsSub: Subscription;
  isLoading: boolean = false;
  playlists: Playlist[];
  user: User;

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private firebaseService: HttpFirebaseService,
    private httpService: HttpYouTubeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.getFirestorePlaylistsSub = this.firebaseService
        .getPlaylists(user)
        .subscribe((playlists) => {
          this.playlists = [];
          playlists.forEach((playlist) => {
            this.getPlaylistsSub = this.httpService
              .getPlaylist(playlist.playlistId)
              .subscribe((data) => {
                const plName = data['items'][0].snippet.localized.title;
                const plAuthor = data['items'][0].snippet.channelTitle;
                const plNumVideos = data['items'][0].contentDetails.itemCount;
                const plImgPath =
                  data['items'][0].snippet.thumbnails.medium.url;
                const plId = data['items'][0].id;
                const newPlaylist = new Playlist(
                  plName,
                  plAuthor,
                  plNumVideos,
                  plImgPath,
                  plId
                );
                this.playlists.push(newPlaylist);
              });
          });
          this.isLoading = false;
        });
    });
  }

  onOpen(i: number) {
    const playlistId = this.playlists[i].id;
    this.playlistService.playlistIdSubject.next(playlistId);
    sessionStorage.setItem('playlistId', JSON.stringify(playlistId));
    this.router.navigate(['/playlist']);
  }

  onDelete(playlistId: string) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.firebaseService.deletePlaylist(playlistId, this.user);
      }
    });
  }

  ngOnDestroy() {
    if (this.getPlaylistsSub) this.getPlaylistsSub.unsubscribe();
    if (this.getFirestorePlaylistsSub)
      this.getFirestorePlaylistsSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }
}
