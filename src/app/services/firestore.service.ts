// Angular core libraries
import { Injectable } from '@angular/core';
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
  CollectionReference,
  getDocs,
  writeBatch,
  docSnapshots,
} from '@angular/fire/firestore';

// Application-specific imports
import { Note } from '../my-playlists/player/note.model';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  savePlaylist(playlistId: string, user: User) {
    const docRef = doc(this.firestore, user.id, playlistId);
    setDoc(docRef, { playlistId: playlistId });
  }

  getPlaylists(user: User) {
    const colRef = collection(this.firestore, user.id);
    return collectionData(colRef);
  }

  async deletePlaylist(playlistId: string, user: User) {
    const playlistRef = doc(this.firestore, user.id, playlistId);
    const subcollections: string[] = [];
    const snapshot = await getDoc(playlistRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data && data.subcollections) {
        subcollections.push(...data.subcollections);
      }
    }

    for (const subcollection of subcollections) {
      const subColRef = collection(
        this.firestore,
        `${user.id}/${playlistId}/${subcollection}/`
      );
      const subColSnapshot = await getDocs(subColRef);

      const batch = writeBatch(this.firestore);
      subColSnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      await batch.commit();
    }

    await deleteDoc(playlistRef);
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
