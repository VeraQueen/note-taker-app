import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  notesAdded = new Subject<Note[]>();
  timeLinksChanged = new Subject<number[]>();

  private notes: Note[] = [];
  private timestampLinks: number[] = [];

  getNotes() {
    return this.notes.slice();
  }

  getLinks() {
    return this.timestampLinks.slice();
  }

  saveNotes(videoId: string, note: Note) {
    this.notes.push(note);
    this.timestampLinks.push(note.timestampSeconds);
    this.timeLinksChanged.next(this.timestampLinks.slice());
    this.notesAdded.next(this.notes.slice());
  }

  saveAndEmpty() {
    this.notes.splice(0, this.notes.length);
    this.timestampLinks.splice(0, this.timestampLinks.length);
  }
}
