// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbjFMBYmtkrUOpp7tNSpr7mOANiggnT-0",
    authDomain: "eatbit-60179.firebaseapp.com",
    projectId: "eatbit-60179",
    storageBucket: "eatbit-60179.appspot.com",
    messagingSenderId: "231662062816",
    appId: "1:231662062816:web:b603a65093a315bdae5485",
    measurementId: "G-27QD1PYJJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // ✅ Move this after initializing `app`

// Export modules
export { app, auth, googleProvider, db };
