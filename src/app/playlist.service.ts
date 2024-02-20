import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  playlistIdSubject = new BehaviorSubject<string>(null);
  videoIdSubject = new BehaviorSubject<string>(null);
}
