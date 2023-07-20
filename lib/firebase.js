import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBfAZ0xJN6gCeghJW93OCsKPt6DH7yAuC4",
    authDomain: "fire-app-91fff.firebaseapp.com",
    projectId: "fire-app-91fff",
    storageBucket: "fire-app-91fff.appspot.com",
    messagingSenderId: "56137935187",
    appId: "1:56137935187:web:d2f50ca4c5c38f18e119a6",
    measurementId: "G-F89M0SBY5R"
  };

  if (!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();