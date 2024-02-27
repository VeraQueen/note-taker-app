import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from './auth/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new Subject<User>();

  constructor(private auth: Auth) {}

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const newUser: User = {
          email: user.email,
          id: user.uid,
        };
        this.userSubject.next(newUser);
      } else {
        console.log('The user is signed out.');
      }
    });
  }
}
