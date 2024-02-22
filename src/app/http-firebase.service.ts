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
    const playlistRef = doc(this.firestore, 'playlists', playlistId);
    let subcollections = [];
    let notes = [];

    getDoc(playlistRef)
      .then((data) => {
        subcollections = data.data().subcollections;
        if (!subcollections) return;
        if (subcollections) {
          subcollections.forEach((subEl) => {
            const colRef = collection(
              this.firestore,
              `playlists/${playlistId}/${subEl}/`
            );
            collectionData(colRef).subscribe((data) => {
              notes = data;
              notes.forEach((el) => {
                let notesEl = el;
                if (!notesEl.note) {
                  const docRef = doc(
                    this.firestore,
                    `playlists/${playlistId}/${subEl}/`,
                    'nullNote'
                  );
                  deleteDoc(docRef);
                } else {
                  const docRef = doc(
                    this.firestore,
                    `playlists/${playlistId}/${subEl}/`,
                    notesEl.note
                  );
                  deleteDoc(docRef);
                }
              });
            });
          });
        }
      })
      .then(() => {
        deleteDoc(playlistRef);
      });
  }

  addVideoNotesCol(playlistId: string, videoId: string) {
    const videoNotesCollections = doc(
      this.firestore,
      `playlists/${playlistId}/${videoId}/`,
      'nullNote'
    );
    setDoc(videoNotesCollections, { null: null });

    const docRef = doc(this.firestore, 'playlists', playlistId);
    updateDoc(docRef, {
      subcollections: arrayUnion(videoId),
    });
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
