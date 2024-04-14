import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
} from '@angular/fire/auth';
import { User } from './auth/user.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  constructor(private auth: Auth, private router: Router) {}

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  updateUserProfile(username: string) {
    updateProfile(this.auth.currentUser, { displayName: username });
  }

  updateUserEmail(email: string) {
    return updateEmail(this.auth.currentUser, email);
  }

  verifyUserEmail(email: string) {
    return verifyBeforeUpdateEmail(this.auth.currentUser, email);
  }

  reauthenticateUser() {
    // reauthenticateWithCredential(this.auth.currentUser, credential);
  }

  signOut() {
    signOut(this.auth);
    this.userSubject.next(null);
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const newUser: User = {
            email: user.email,
            id: user.uid,
            username: user.displayName,
          };
          this.userSubject.next(newUser);
          resolve(newUser);
        } else {
          reject('You are signed out. Sign in again to start noting down!');
        }
      });
    });
  }
}
