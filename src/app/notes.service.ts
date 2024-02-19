import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  sendTimeLink = new Subject<number>();

  playHere(timeLink: number) {
    this.sendTimeLink.next(timeLink);
  }

  // deleteNote(i: number) {
  //   this.timestampLinks.splice(i, 1);
  //   this.timeLinksChanged.next(this.timestampLinks.slice());
  // }

  // saveAndEmpty() {
  //   this.notes.splice(0, this.notes.length);
  //   this.timestampLinks.splice(0, this.timestampLinks.length);
  // }
}
