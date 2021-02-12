import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBMl1Ro6x5kld6At4DStvhWJhA6H4Iabuk",
    authDomain: "react-artics.firebaseapp.com",
    projectId: "react-artics",
    storageBucket: "react-artics.appspot.com",
    messagingSenderId: "990978688400",
    appId: "1:990978688400:web:c20773e870e8133bf31f15",
    measurementId: "G-VYJ081WR5Q"
});

const auth = app.auth()

export {
    auth,
    app
};

