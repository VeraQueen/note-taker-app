// Angular core libraries
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

// Third-party libraries
import { ReplaySubject } from 'rxjs';

// Application-specific imports
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new ReplaySubject<User | null>();
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
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }

  reauthenticateUser(userProvidedPassword: string) {
    let credential = EmailAuthProvider.credential(
      this.auth.currentUser.email,
      userProvidedPassword
    );
    return reauthenticateWithCredential(this.auth.currentUser, credential);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const newUser: User = {
            email: user.email,
            id: user.uid,
            username: user.displayName,
            profilePhoto: user.photoURL,
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
