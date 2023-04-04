// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export interface UserService {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
