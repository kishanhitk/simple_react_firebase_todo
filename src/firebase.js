import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyB_J8RZeEkl0XaaXV8Bt4LFqbX7cbzv0hU",
    authDomain: "bugsbyte-3a305.firebaseapp.com",
    databaseURL: "https://bugsbyte-3a305.firebaseio.com",
    projectId: "bugsbyte-3a305",
    storageBucket: "bugsbyte-3a305.appspot.com",
    messagingSenderId: "339329728062",
    appId: "1:339329728062:web:6e9dc2c8504ba0c179db6f",
    measurementId: "G-2CKGB32S3D"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export default firebase;