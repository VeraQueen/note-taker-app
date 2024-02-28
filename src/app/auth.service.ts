import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { User } from './auth/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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

  signOut() {
    signOut(this.auth);
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
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
