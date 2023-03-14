//export const environment = {};
//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuADTGF3AXZGgYaC0lPmvXoAvpIFUgcbc",
  authDomain: "angulartourofheroes-c75de.firebaseapp.com",
  projectId: "angulartourofheroes-c75de",
  storageBucket: "angulartourofheroes-c75de.appspot.com",
  messagingSenderId: "659937692264",
  appId: "1:659937692264:web:d0e50e19b0668a2c4c49dd"
};

// // Initialize Firebase
 export const app = initializeApp(firebaseConfig);


// export const environment = {
//     production: false,
//     firebase: {
//         apiKey: "AIzaSyDuADTGF3AXZGgYaC0lPmvXoAvpIFUgcbc",
//         authDomain: "angulartourofheroes-c75de.firebaseapp.com",
//         projectId: "angulartourofheroes-c75de",
//         storageBucket: "angulartourofheroes-c75de.appspot.com",
//         messagingSenderId: "659937692264",
//         appId: "1:659937692264:web:d0e50e19b0668a2c4c49dd"
//     }
// };