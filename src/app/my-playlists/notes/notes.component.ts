import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  YT: any;
  video: any;
  videoPlayer: any;
  reframed: boolean = false;
  timeStamp: string = '0:00';
  showForm: boolean = false;

  constructor() {}

  ngOnInit() {
    this.init();
  }

  init() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.videoPlayer = new window['YT'].Player('videoPlayer', {
      videoId: 'M7lc1UVf-VE',
      playerVars: {
        playsinline: 1,
        rel: 0,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PAUSED:
        console.log('paused');
        this.calculateTimestamp();
        break;
    }
  }

  onPlayerError(event) {
    console.log('error', event);
  }

  onTakeNote() {
    this.calculateTimestamp();
    this.videoPlayer.pauseVideo();
    this.showForm = true;
  }

  onSaveNote(noteForm: NgForm) {
    console.log(noteForm);
    const timeStampSeconds = Math.floor(this.videoPlayer.getCurrentTime());
    const note = noteForm.value.note;
    console.log(timeStampSeconds, note);
    noteForm.reset();
  }

  onCancelNote(noteForm: NgForm) {
    noteForm.reset();
    this.showForm = false;
    this.videoPlayer.playVideo();
  }

  private calculateTimestamp() {
    const minutes: number = +Math.floor(this.videoPlayer.getCurrentTime() / 60);
    const seconds: number = +Math.floor(this.videoPlayer.getCurrentTime() % 60);
    this.timeStamp = minutes + ':' + seconds;
    console.log(this.timeStamp);
  }
}
