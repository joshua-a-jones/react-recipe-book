import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcmMcykHSFy1vTLOhT9NmktXHZB049tiw",
  authDomain: "recipe-book-project-85654.firebaseapp.com",
  projectId: "recipe-book-project-85654",
  storageBucket: "recipe-book-project-85654.appspot.com",
  messagingSenderId: "410513841063",
  appId: "1:410513841063:web:c4b3c07129c6e0f88c3482",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
