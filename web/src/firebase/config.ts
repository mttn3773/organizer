import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkyaBBTxWyGH-VfgNUlHSXRJ6K__6yGpA",
  authDomain: "organize-4f922.firebaseapp.com",
  databaseURL:
    "https://organize-4f922-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "organize-4f922",
  storageBucket: "organize-4f922.appspot.com",
  messagingSenderId: "392548704804",
  appId: "1:392548704804:web:cd4911ed715670e433aeb1",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
