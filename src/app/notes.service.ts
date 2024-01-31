import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private noteSub = new Subject<Note>();

  private notesStorage = new Map();
  private videoNotes = new Map();
  private notes: Object[] = [];

  sendNotes(videoId: string, note: Note) {
    this.noteSub.next(note);
    this.notes.push(note);
    console.log(this.notes);
    this.videoNotes.set(videoId, this.notes);
    this.notesStorage.forEach((value, key) => {
      console.log(key);
      console.log(value);
    });
  }

  setNewPlaylistNotes(playlistId: string) {
    this.notesStorage.set(playlistId, this.videoNotes);
    this.notesStorage.forEach((value, key) => {
      console.log(key);
      console.log(value);
    });
  }

  saveAndEmpty() {
    this.notes.splice(0, this.notes.length);
    this.videoNotes.clear();
  }
}
