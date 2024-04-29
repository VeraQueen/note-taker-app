import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes.service';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/auth/user.model';

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
  videoId: string;
  playlistId: string;
  user: User;

  constructor(
    private noteService: NoteService,
    private playlistService: PlaylistService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then((user: User) => {
      this.user = user;
      this.playlistIdSub = this.playlistService.playlistIdSubject.subscribe(
        (playlistId) => {
          const sessionStoragePlaylistId: string = JSON.parse(
            sessionStorage.getItem('playlistId')
          );
          if (playlistId) {
            this.playlistId = playlistId;
          } else if (!playlistId && sessionStoragePlaylistId !== null) {
            this.playlistId = sessionStoragePlaylistId;
          }
        }
      );
      this.videoIdSub = this.playlistService.videoIdSubject.subscribe(
        (videoId) => {
          const sessionStorageVideoId: string = JSON.parse(
            sessionStorage.getItem('videoId')
          );
          if (videoId) {
            this.videoId = videoId;
          } else if (!videoId && sessionStorageVideoId !== null) {
            this.videoId = sessionStorageVideoId;
          }
        }
      );
      this.notesSub = this.firestoreService
        .getVideoNotes(this.playlistId, this.videoId, this.user)
        .subscribe((allNotes) => {
          this.notes = [];
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
              this.sortAsc(this.notes);
            }
          });
        });
    });
  }

  onSortAsc() {
    this.sortAsc(this.notes);
  }

  onSortDesc() {
    this.sortDesc(this.notes);
  }

  onPlayHere(i: number) {
    this.noteService.sendTimeLink.next(this.notes[i].timestampSeconds);
  }

  onDelete(i: number) {
    this.firestoreService.deleteNote(
      this.playlistId,
      this.videoId,
      this.notes[i],
      this.user
    );
  }

  private sortDesc(notes?: Note[]) {
    if (notes.length > 1) {
      this.notes = notes.sort(
        (a, b) => a.timestampSeconds - b.timestampSeconds
      );
    }
  }

  private sortAsc(notes?: Note[]) {
    if (notes.length > 1) {
      this.notes = notes.sort(
        (a, b) => b.timestampSeconds - a.timestampSeconds
      );
    }
  }

  ngOnDestroy() {
    if (this.playlistIdSub) this.playlistIdSub.unsubscribe();
    if (this.videoIdSub) this.videoIdSub.unsubscribe();
    if (this.notesSub) this.notesSub.unsubscribe();
  }
}
