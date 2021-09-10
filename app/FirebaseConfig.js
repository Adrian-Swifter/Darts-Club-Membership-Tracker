import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXLOEcYPSuVJ-aB2KFeNJnGPk1KFTq9Dw",
  authDomain: "pikado-klub-clanarine.firebaseapp.com",
  projectId: "pikado-klub-clanarine",
  storageBucket: "pikado-klub-clanarine.appspot.com",
  messagingSenderId: "827906029595",
  appId: "1:827906029595:web:333900f2f6591bc7e6a0be",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
milos2