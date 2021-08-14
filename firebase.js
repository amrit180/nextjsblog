import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBM3iMcs0rV72VG33aL2fScsN0_6l3FkYE",
  authDomain: "next-blog-7cab7.firebaseapp.com",
  projectId: "next-blog-7cab7",
  storageBucket: "next-blog-7cab7.appspot.com",
  messagingSenderId: "276748805371",
  appId: "1:276748805371:web:d00dfffd784da23fd97c5e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
