import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NoteService } from 'src/app/notes.service';
import { Note } from '../note.model';
import { Subscription, take } from 'rxjs';
import { HttpFirebaseService } from 'src/app/http-firebase.service';
import { PlaylistService } from 'src/app/playlist.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  private noteSub: Subscription;
  private linksSub: Subscription;
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
    this.playlistService.playlistIdSubject.subscribe((playlistId) => {
      this.playlistId = playlistId;
    });
    this.playlistService.videoIdSubject.subscribe((videoId) => {
      this.videoId = videoId;
    });
    this.firebaseService
      .getVideoNotes(this.playlistId, this.videoId)
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
          }
        });
      });

    // this.notes = this.noteService.getNotes();
    // this.timestampsLinks = this.noteService.getLinks();
    // this.noteSub = this.noteService.notesChanged.subscribe((notes) => {
    //   this.notes = notes;
    // });
    // this.linksSub = this.noteService.timeLinksChanged.subscribe(
    //   (timestampsLinks) => {
    //     this.timestampsLinks = timestampsLinks;
    //   }
    // );
  }

  onPlayHere(i: number) {
    this.noteService.playHere(this.timestampsLinks[i]);
  }

  onDelete(i: number) {
    this.noteService.deleteNote(i);
  }

  ngOnDestroy() {
    this.noteService.saveAndEmpty();
    if (this.noteSub) this.noteSub.unsubscribe();
    if (this.linksSub) this.linksSub.unsubscribe();
  }
}
