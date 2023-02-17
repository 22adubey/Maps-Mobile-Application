import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCf4nHOEIJ9FYBqBwxqQZsqbhnysv_3iZg",
    authDomain: "routora-c6502.firebaseapp.com",
    projectId: "routora-c6502",
    storageBucket: "routora-c6502.appspot.com",
    messagingSenderId: "571185470577",
    appId: "1:571185470577:web:386fa3c5b3755d74978fd0",
    measurementId: "G-VWWNC0K51R"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const db = getFirestore(app);