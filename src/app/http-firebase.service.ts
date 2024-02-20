import { Injectable } from '@angular/core';
import { Note } from './my-playlists/player/note.model';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  collectionData,
  deleteDoc,
  arrayUnion,
  updateDoc,
  getDoc,
  arrayRemove,
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

  addWatchedVideoIds(playlistId: string, videoId: string) {
    const docRef = doc(this.firestore, 'playlists', playlistId);
    updateDoc(docRef, { watchedVideoIds: arrayUnion(videoId) });
  }

  getWatchedVideoIds(playlistId: string) {
    const docRef = doc(this.firestore, 'playlists', playlistId);
    return getDoc(docRef);
  }

  removeFromWatched(videoId: string, playlistId: string) {
    const docRef = doc(this.firestore, 'playlists', playlistId);
    updateDoc(docRef, { watchedVideoIds: arrayRemove(videoId) });
  }

  saveNote(playlistId: string, videoId: string, note: Note) {
    const colRef = doc(
      this.firestore,
      `playlists/${playlistId}/${videoId}`,
      `${note.note}`
    );
    setDoc(colRef, {
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

  deleteNote(playlistId: string, videoId: string, note: Note) {
    const docRef = doc(
      this.firestore,
      `playlists/${playlistId}/${videoId}/${note.note}`
    );
    deleteDoc(docRef);
  }
}
