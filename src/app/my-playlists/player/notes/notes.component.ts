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
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {}
}
