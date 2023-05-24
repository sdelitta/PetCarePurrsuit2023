import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC6ugnxPEPL3S5jVYBIeMKanS8j0Qkc6eQ",
    authDomain: "petpurrsuit-23168.firebaseapp.com",
    projectId: "petpurrsuit-23168",
    storageBucket: "petpurrsuit-23168.appspot.com",
    messagingSenderId: "476094170516",
    appId: "1:476094170516:web:3bea36892b90093a68fb81",
    measurementId: "G-YWZYRYMSLH"
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
