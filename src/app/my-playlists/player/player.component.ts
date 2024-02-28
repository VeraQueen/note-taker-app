import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { NoteService } from 'src/app/notes.service';
import { PlaylistService } from 'src/app/playlist.service';
import { Note } from './note.model';
import { HttpFirebaseService } from 'src/app/http-firebase.service';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  userSub: Subscription;
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
    private firebaseService: HttpFirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.userSubject.subscribe((user) => {
      this.user = user;
    });
    this.playlistService.videoIdSubject.pipe(take(1)).subscribe((videoId) => {
      this.video = videoId;
    });
    this.playlistService.playlistIdSubject
      .pipe(take(1))
      .subscribe((playlisId) => {
        this.playlistId = playlisId;
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
        host: 'https://youtube.com',
        origin: 'https://localhost:4200',
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
            this.firebaseService.addWatchedVideoIds(
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
      this.firebaseService.saveNote(
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
    if (this.userSub) this.userSub.unsubscribe();
  }

  checkPlayer() {}

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
