/** @format */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCV5Iou2B_Qt-uoni0qbFPylRmkL27paGo",
  authDomain: "twitter-clone-nextjs-c850c.firebaseapp.com",
  projectId: "twitter-clone-nextjs-c850c",
  storageBucket: "twitter-clone-nextjs-c850c.appspot.com",
  messagingSenderId: "161852216702",
  appId: "1:161852216702:web:451cfc4c50773dfc130f2f"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export { auth, app, db, storage, provider };