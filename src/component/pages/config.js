// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0_vpmyadNcGScgvnb5ZrPIxfDeRyfiL4",
  authDomain: "bank-3c593.firebaseapp.com",
  databaseURL: "https://bank-3c593-default-rtdb.firebaseio.com",
  projectId: "bank-3c593",
  storageBucket: "bank-3c593.firebasestorage.app",
  messagingSenderId: "1032120015688",
  appId: "1:1032120015688:web:6a98733354836384c6b17d",
  measurementId: "G-2T5E4SV30P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app); 

// Initialize Firebase Realtime Database
const db = getDatabase(app);

// Export app, auth, and db for use in your components
export { app, auth, db };
