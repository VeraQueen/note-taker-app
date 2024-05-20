// Angular core libraries
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Thirs-party libraries
import { Subscription } from 'rxjs';

// Application-specific imports
import { Playlist } from './playlist.model';
import { User } from 'src/app/auth/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeletePlaylistDialogComponent } from 'src/app/shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { PlaylistService } from 'src/app/services/playlist.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { YouTubeService } from 'src/app/services/youtube.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
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
    private firebaseService: FirestoreService,
    private youtubeService: YouTubeService,
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
            this.getPlaylistsSub = this.youtubeService
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
    let dialogRef = this.dialog.open(DeletePlaylistDialogComponent);
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
