import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCf4nHOEIJ9FYBqBwxqQZsqbhnysv_3iZg",
    authDomain: "routora-c6502.firebaseapp.com",
    projectId: "routora-c6502",
    storageBucket: "routora-c6502.appspot.com",
    messagingSenderId: "571185470577",
    appId: "1:571185470577:web:386fa3c5b3755d74978fd0",
  };

  let app;
  
   if (firebase.apps.length === 0){
        app = firebase.initializeApp(firebaseConfig);
   }
   else {
    app = firebase.app()
   }

   const auth = firebase.auth()

   export default auth