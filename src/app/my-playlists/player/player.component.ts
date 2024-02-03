import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { NoteService } from 'src/app/notes.service';
import { PlaylistService } from 'src/app/playlist.service';
import { Note } from './note.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  video: any;
  videoPlayer: any;
  timestamp: string;
  timestampSeconds: number;
  showForm: boolean = false;
  saveNoteBtnClicked: boolean = false;
  @ViewChild('noteForm', { static: false }) noteForm: NgForm;

  constructor(
    private playlistService: PlaylistService,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.playlistService.videoIdSubject.pipe(take(1)).subscribe((videoId) => {
      this.video = videoId;
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
        break;
      case window['YT'].PlayerState.PAUSED:
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
      this.noteService.saveNotes(this.video, newNote);
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
    this.noteService.saveAndEmpty();
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
