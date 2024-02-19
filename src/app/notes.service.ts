import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  timeLinksChanged = new Subject<number[]>();
  sendTimeLink = new Subject<number>();

  private timestampLinks: number[] = [];

  getLinks() {
    return this.timestampLinks.slice();
  }

  playHere(timeLink: number) {
    this.sendTimeLink.next(timeLink);
  }

  // addNotes(videoId: string, note: Note) {
  //   this.timestampLinks.push(note.timestampSeconds);
  //   this.timeLinksChanged.next(this.timestampLinks.slice());
  // }

  // deleteNote(i: number) {
  //   this.timestampLinks.splice(i, 1);
  //   this.timeLinksChanged.next(this.timestampLinks.slice());
  // }

  // saveAndEmpty() {
  //   this.notes.splice(0, this.notes.length);
  //   this.timestampLinks.splice(0, this.timestampLinks.length);
  // }
}
