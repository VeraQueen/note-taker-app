import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
  collectionData,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class HttpFirebaseService {
  constructor(private firestore: Firestore) {}

  savePlaylist(playlistId: string) {
    const docRef = doc(this.firestore, 'playlists', playlistId);
    setDoc(docRef, { playlistId: playlistId });
  }

  getPlaylists() {
    const colRef = collection(this.firestore, 'playlists');
    return collectionData(colRef);
  }

  deletePlaylist(playlistId: string) {
    const docRef = doc(this.firestore, 'playlists', playlistId);
    deleteDoc(docRef);
  }

  addVideoNotesCol(playlistId: string, videoId: string) {
    const videoNotesCollections = doc(
      this.firestore,
      `playlists/${playlistId}/${videoId}/`,
      'nullNote'
    );
    setDoc(videoNotesCollections, { null: null });
  }

  saveNote(playlistId: string, videoId: string, note: Note) {
    const colRef = collection(
      this.firestore,
      `playlists/${playlistId}/${videoId}`
    );
    addDoc(colRef, {
      note: note.note,
      timestamp: note.timestamp,
      timestampSeconds: note.timestampSeconds,
    });
  }

  getVideoNotes(playlistId: string, videoId: string) {
    const colRef = collection(
      this.firestore,
      `playlists/${playlistId}/${videoId}`
    );
    return collectionData(colRef);
  }
}
