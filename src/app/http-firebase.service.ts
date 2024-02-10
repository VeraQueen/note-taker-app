import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';

@Injectable({ providedIn: 'root' })
export class HttpFirebaseService {
  constructor(private http: HttpClient) {}
  saveNotes(videoNote: { videoId: string; note: Note }) {}
}
