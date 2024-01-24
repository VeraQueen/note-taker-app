import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  video: any;
  videoPlayer: any;
  timeStamp: string = '0:00';
  showForm: boolean = false;
  saveNoteBtnClicked: boolean = false;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    // this.playlistService.videoIdSubject.pipe(take(1)).subscribe((videoId) => {
    //   this.video = videoId;
    // });
    this.video = 'M7lc1UVf-VE';
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
    this.calculateTimestamp();
    this.videoPlayer.pauseVideo();
    this.showForm = true;
  }

  onSaveNote(noteForm: NgForm) {
    if (noteForm.invalid) {
      this.saveNoteBtnClicked = true;
      return;
    } else {
      const timeStampSeconds = Math.floor(this.videoPlayer.getCurrentTime());
      const note = noteForm.value.note;
      console.log(timeStampSeconds, note);
      this.showForm = false;
      noteForm.reset();
    }
  }

  onCancelNote(noteForm: NgForm) {
    noteForm.reset();
    this.showForm = false;
    this.videoPlayer.playVideo();
  }

  ngOnDestroy() {}

  private calculateTimestamp() {
    const minutes: number = +Math.floor(this.videoPlayer.getCurrentTime() / 60);
    const seconds: number = +Math.floor(this.videoPlayer.getCurrentTime() % 60);
    if (seconds < 10) {
      this.timeStamp = minutes + ':' + 0 + seconds;
    } else {
      this.timeStamp = minutes + ':' + seconds;
    }
    console.log(this.timeStamp);
  }
}
