// Angular core libraries
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// Thirs-party libraries
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Application-specific imports
import { Note } from './note.model';
import { User } from 'src/app/auth/user.model';
import { NoteService } from 'src/app/services/notes.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit, OnDestroy {
  private playlistIdSub: Subscription;
  private videoIdSub: Subscription;
  error: string;
  i;
  currentTime: number;
  duration: number;
  playlistId: string;
  video: string;
  videoPlayer: any;
  timestamp: string;
  timestampSeconds: number;
  showButton: boolean = true;
  showForm: boolean = false;
  saveNoteBtnClicked: boolean = false;
  user: User;
  @ViewChild('noteForm', { static: false }) noteForm: NgForm;

  constructor(
    private playlistService: PlaylistService,
    private noteService: NoteService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
    });
    this.videoIdSub = this.playlistService.videoIdSubject
      .pipe(take(1))
      .subscribe((videoId: string) => {
        const sessionStorageVideoId: string = JSON.parse(
          sessionStorage.getItem('videoId')
        );
        if (videoId) {
          this.video = videoId;
        } else if (!videoId && sessionStorageVideoId !== null) {
          this.video = sessionStorageVideoId;
        } else {
          this.error = 'An unknown error occurred.';
        }
      });
    this.playlistIdSub = this.playlistService.playlistIdSubject
      .pipe(take(1))
      .subscribe((playlistId) => {
        const sessionStoragePlaylistId: string = JSON.parse(
          sessionStorage.getItem('playlistId')
        );
        if (playlistId) {
          this.playlistId = playlistId;
        } else if (!playlistId && sessionStoragePlaylistId !== null) {
          this.playlistId = sessionStoragePlaylistId;
        } else {
          this.error = 'An unknown error occurred.';
        }
      });
    this.init();
  }

  init() {
    if (window['YT']) {
      this.startVideo();
      return;
    }

    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.videoPlayer = new window['YT'].Player('videoPlayer', {
      videoId: this.video,
      playerVars: {
        playsinline: 1,
        rel: 0,
        host: 'https://www.youtube.com',
        origin: `https://${window.location.host}`,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
    this.noteService.sendTimeLink.subscribe((timeLink) => {
      this.videoPlayer.seekTo(timeLink);
    });
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        this.i = setInterval(() => {
          this.currentTime = this.videoPlayer.getCurrentTime();
          this.duration = this.videoPlayer.getDuration();
          let watched = (this.currentTime / this.duration) * 100;
          watched = Math.round(watched);
          if (watched >= 80) {
            this.firestoreService.addWatchedVideoIds(
              this.playlistId,
              this.video,
              this.user
            );
            clearInterval(this.i);
          }
        }, 5000);
        break;
      case window['YT'].PlayerState.PAUSED:
        clearInterval(this.i);
        break;
    }
  }

  onTakeNote() {
    if (this.showForm && this.noteForm.invalid) {
      this.videoPlayer.playVideo();
      this.showForm = false;
    } else {
      this.calculateTimestamp();
      this.videoPlayer.pauseVideo();
      this.showForm = true;
    }
  }

  onSaveNote(noteForm: NgForm) {
    if (noteForm.invalid) {
      this.saveNoteBtnClicked = true;
      return;
    } else {
      const timestamp = this.timestamp;
      const timestampSeconds = this.timestampSeconds;
      const note = noteForm.value.note;
      const newNote: Note = {
        note,
        timestamp,
        timestampSeconds,
      };
      this.firestoreService.saveNote(
        this.playlistId,
        this.video,
        newNote,
        this.user
      );
      this.showForm = false;
      noteForm.reset();
    }
  }

  onCancelNote(noteForm: NgForm) {
    noteForm.reset();
    this.showForm = false;
    this.videoPlayer.playVideo();
  }

  ngOnDestroy() {
    if (this.playlistIdSub) this.playlistIdSub.unsubscribe();
    if (this.videoIdSub) this.videoIdSub.unsubscribe();
  }

  private calculateTimestamp() {
    this.timestampSeconds = Math.floor(this.videoPlayer.getCurrentTime());
    const minutes: number = +Math.floor(this.videoPlayer.getCurrentTime() / 60);
    const seconds: number = +Math.floor(this.videoPlayer.getCurrentTime() % 60);
    if (seconds < 10) {
      this.timestamp = minutes + ':' + 0 + seconds;
    } else {
      this.timestamp = minutes + ':' + seconds;
    }
  }
}
