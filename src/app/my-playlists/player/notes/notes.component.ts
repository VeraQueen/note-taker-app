import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { NoteService } from 'src/app/notes.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[];
  timestampsLinks: number[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notes = this.noteService.getNotes();
    this.notes.forEach((el) => {
      this.timestampsLinks.push(el.timestampSeconds);
    });

    this.noteService.notesAdded.subscribe((note) => {
      const newNotes = [];
      newNotes.push(note);
      if (this.notes === undefined || !this.notes || this.notes.length === 0) {
        this.notes = [...newNotes];
      } else {
        this.notes = [...this.notes, ...newNotes];
      }

      const newLinks = [];
      newLinks.push(note.timestampSeconds);
      if (
        this.timestampsLinks === undefined ||
        !this.timestampsLinks ||
        this.timestampsLinks.length === 0
      ) {
        this.timestampsLinks = [...newLinks];
      } else {
        this.timestampsLinks = [...this.timestampsLinks, ...newLinks];
      }
      console.log(this.notes, this.timestampsLinks);
    });
  }

  onPlayHere() {}
}
