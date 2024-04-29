import { Injectable } from '@angular/core';
import {
  Auth,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public auth: Auth) {}

  passwordReset(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  setUsername(username: string) {
    return updateProfile(this.auth.currentUser, { displayName: username });
  }

  updatePassword(newPassword: string) {
    return updatePassword(this.auth.currentUser, newPassword);
  }

  verifyUserEmailToUpdate(email: string) {
    return verifyBeforeUpdateEmail(this.auth.currentUser, email);
  }
}
