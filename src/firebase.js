/** @format */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4gi__0v6EdT2k0beU9ZC9Wt5kYhuPxyY",
  authDomain: "instagram-clone-nextjs-5cb39.firebaseapp.com",
  projectId: "instagram-clone-nextjs-5cb39",
  storageBucket: "instagram-clone-nextjs-5cb39.appspot.com",
  messagingSenderId: "952897773732",
  appId: "1:952897773732:web:81b69b8e141ce4ce77c631",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export { auth, app, db, storage, provider };