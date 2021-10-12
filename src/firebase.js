import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVOmoi9t86yOL1GwhhjrSwkrf6szCR1iE",
  authDomain: "yt-cln.firebaseapp.com",
  projectId: "yt-cln",
  storageBucket: "yt-cln.appspot.com",
  messagingSenderId: "268613653018",
  appId: "1:268613653018:web:d427d558089d85fa1137a3",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const provider = new GoogleAuthProvider();
export default firebaseApp;
