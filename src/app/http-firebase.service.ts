import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpFirebaseService {
  constructor(private firestore: Firestore) {}
  // async saveNotes(note: Note) {
  //   console.log(note);
  //   await addDoc(collection(this.firestore, 'notes'), {
  //     note: note.note,
  //     timestamp: note.timestamp,
  //     timestampSeconds: note.timestampSeconds,
  //   });
  // }

  savePlaylist(playlistId: string) {
    const docRef = doc(this.firestore, 'playlists', playlistId);
    setDoc(docRef, { playlistId: playlistId });
  }

  getPlaylists() {
    const colRef = collection(this.firestore, 'playlists');
    return collectionData(colRef);
  }
}
