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
import { User } from './auth/user.model';

@Injectable({ providedIn: 'root' })
export class HttpFirebaseService {
  constructor(private firestore: Firestore) {}

  savePlaylist(playlistId: string, user: User) {
    const docRef = doc(this.firestore, user.id, playlistId);
    setDoc(docRef, { playlistId: playlistId });
  }

  getPlaylists(user: User) {
    const colRef = collection(this.firestore, user.id);
    return collectionData(colRef);
  }

  deletePlaylist(playlistId: string, user: User) {
    const playlistRef = doc(this.firestore, user.id, playlistId);
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
              `${user.id}/${playlistId}/${subEl}/`
            );
            collectionData(colRef).subscribe((data) => {
              notes = data;
              notes.forEach((el) => {
                let notesEl = el;
                if (!notesEl.note) {
                  const docRef = doc(
                    this.firestore,
                    `${user.id}/${playlistId}/${subEl}/`,
                    'nullNote'
                  );
                  deleteDoc(docRef);
                } else {
                  const docRef = doc(
                    this.firestore,
                    `${user.id}/${playlistId}/${subEl}/`,
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

  addVideoNotesCol(playlistId: string, videoId: string, user: User) {
    const videoNotesCollections = doc(
      this.firestore,
      `${user.id}/${playlistId}/${videoId}/`,
      'nullNote'
    );
    setDoc(videoNotesCollections, { null: null });

    const docRef = doc(this.firestore, user.id, playlistId);
    updateDoc(docRef, {
      subcollections: arrayUnion(videoId),
    });
  }

  addWatchedVideoIds(playlistId: string, videoId: string, user: User) {
    const docRef = doc(this.firestore, user.id, playlistId);
    updateDoc(docRef, { watchedVideoIds: arrayUnion(videoId) });
  }

  getWatchedVideoIds(playlistId: string, user: User) {
    const docRef = doc(this.firestore, user.id, playlistId);
    return getDoc(docRef);
  }

  removeFromWatched(videoId: string, playlistId: string, user: User) {
    const docRef = doc(this.firestore, user.id, playlistId);
    updateDoc(docRef, { watchedVideoIds: arrayRemove(videoId) });
  }

  saveNote(playlistId: string, videoId: string, note: Note, user: User) {
    const colRef = doc(
      this.firestore,
      `${user.id}/${playlistId}/${videoId}`,
      `${note.note}`
    );
    setDoc(colRef, {
      note: note.note,
      timestamp: note.timestamp,
      timestampSeconds: note.timestampSeconds,
    });
  }

  getVideoNotes(playlistId: string, videoId: string, user: User) {
    const colRef = collection(
      this.firestore,
      `${user.id}/${playlistId}/${videoId}`
    );
    return collectionData(colRef);
  }

  deleteNote(playlistId: string, videoId: string, note: Note, user: User) {
    const docRef = doc(
      this.firestore,
      `${user.id}/${playlistId}/${videoId}/${note.note}`
    );
    deleteDoc(docRef);
  }
}
