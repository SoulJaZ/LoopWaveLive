import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQpZGSstYEQ1AdQeIlNcgHLZlKBCE-jHM",
  authDomain: "loop-wavelife.firebaseapp.com",
  projectId: "loop-wavelife",
  storageBucket: "loop-wavelife.appspot.com",
  messagingSenderId: "695753765499",
  appId: "1:695753765499:web:1e2da5075a9f3f2f3c28de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app)

export { storage, db, app};