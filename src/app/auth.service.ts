import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    signOut(this.auth);
    this.router.navigate(['/auth']);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const newUser: User = {
            email: user.email,
            id: user.uid,
          };
          console.log('User is logged in.');
          resolve(newUser);
        } else {
          console.log('The user is signed out.');
          reject('You are signed out. Sign in again to start noting down!');
        }
      });
    });
  }
}
