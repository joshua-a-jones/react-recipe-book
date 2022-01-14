import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAdE17F_slxEKmyCAnMYAB8Ew0LUt_Pcjs",
    authDomain: "recipe-library-c7266.firebaseapp.com",
    projectId: "recipe-library-c7266",
    storageBucket: "recipe-library-c7266.appspot.com",
    messagingSenderId: "538942028195",
    appId: "1:538942028195:web:85de6989b85b826b6a4216"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig);

  //init services
  const projectFirestore = firebase.firestore();

  export { projectFirestore }