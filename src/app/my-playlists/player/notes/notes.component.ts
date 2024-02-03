import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from 'src/app/notes.service';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  private noteSub: Subscription;
  private linksSub: Subscription;
  notes: Note[];
  timestampsLinks: number[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notes = this.noteService.getNotes();
    this.timestampsLinks = this.noteService.getLinks();

    this.noteSub = this.noteService.notesAdded.subscribe((notes) => {
      this.notes = notes;
      console.log(this.notes);
    });
    this.linksSub = this.noteService.timeLinksChanged.subscribe(
      (timestampsLinks) => {
        this.timestampsLinks = timestampsLinks;
        console.log(this.timestampsLinks);
      }
    );
  }

  onPlayHere(i: number) {
    console.log(i, this.timestampsLinks[i]);
  }

  ngOnDestroy() {
    this.noteService.saveAndEmpty();
    if (this.noteSub) this.noteSub.unsubscribe();
    if (this.linksSub) this.linksSub.unsubscribe();
  }
}
