import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChSY8pP1K3YztJsStKJgbLRT_X_pM80A4",
  authDomain: "obione-chat.firebaseapp.com",
  projectId: "obione-chat",
  storageBucket: "obione-chat.appspot.com",
  messagingSenderId: "656360933202",
  appId: "1:656360933202:web:3684f5703a83eda7359c8b",
  measurementId: "G-1DL27P0PNM"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };