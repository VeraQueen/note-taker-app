import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage, private auth: Auth) {}
  uploadProfilePicture(profilePicFile: File) {
    const profileImageRef = ref(this.storage, `${this.auth.currentUser.uid}`);
    return uploadBytes(profileImageRef, profilePicFile);
  }
}
