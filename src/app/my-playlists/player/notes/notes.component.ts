import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from 'src/app/notes.service';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';
import { HttpFirebaseService } from 'src/app/http-firebase.service';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  private playlistIdSub: Subscription;
  private videoIdSub: Subscription;
  private notesSub: Subscription;
  notes: Note[] = [];
  timestampsLinks: number[] = [];
  videoId: string;
  playlistId: string;

  constructor(
    private noteService: NoteService,
    private playlistService: PlaylistService,
    private firebaseService: HttpFirebaseService
  ) {}

  ngOnInit() {
    this.playlistIdSub = this.playlistService.playlistIdSubject.subscribe(
      (playlistId) => {
        this.playlistId = playlistId;
      }
    );
    this.videoIdSub = this.playlistService.videoIdSubject.subscribe(
      (videoId) => {
        this.videoId = videoId;
      }
    );
    this.notesSub = this.firebaseService
      .getVideoNotes(this.playlistId, this.videoId)
      .subscribe((allNotes) => {
        this.notes = [];
        this.timestampsLinks = [];
        allNotes.forEach((note) => {
          const noteEl: Note = {
            note: note.note,
            timestamp: note.timestamp,
            timestampSeconds: note.timestampSeconds,
          };
          if (
            note.note === undefined &&
            note.timestamp === undefined &&
            note.timestampSeconds === undefined
          ) {
            return;
          } else {
            this.notes.push(noteEl);
            this.timestampsLinks.push(noteEl.timestampSeconds);
            this.sortAsc(this.notes, this.timestampsLinks);
          }
        });
      });
  }

  onSortAsc() {
    this.sortAsc(this.notes, this.timestampsLinks);
  }

  onSortDesc() {
    this.sortDesc(this.notes, this.timestampsLinks);
  }

  onPlayHere(i: number) {
    this.noteService.playHere(this.timestampsLinks[i]);
  }

  // onDelete(i: number) {
  //   this.noteService.deleteNote(i);
  // }

  private sortDesc(notes?: Note[], timestampSeconds?: number[]) {
    if (notes) {
      this.notes = notes.sort(
        (a, b) => a.timestampSeconds - b.timestampSeconds
      );
    }
    if (timestampSeconds) {
      this.timestampsLinks = timestampSeconds.sort((a, b) => a - b);
    }
  }

  private sortAsc(notes?: Note[], timestampSeconds?: number[]) {
    if (notes) {
      this.notes = notes.sort(
        (a, b) => b.timestampSeconds - a.timestampSeconds
      );
    }
    if (timestampSeconds) {
      this.timestampsLinks = timestampSeconds.sort((a, b) => b - a);
    }
  }

  ngOnDestroy() {
    // this.noteService.saveAndEmpty();
    if (this.playlistIdSub) this.playlistIdSub.unsubscribe();
    if (this.videoIdSub) this.videoIdSub.unsubscribe();
    if (this.notesSub) this.notesSub.unsubscribe();
  }
}
