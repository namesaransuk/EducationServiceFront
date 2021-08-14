import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyA9cQJP8gFmSyqZYJRzyyGt-GJz3K6-Llw",
    authDomain: "james2-67f02.firebaseapp.com",
    databaseURL: "https://james2-67f02.firebaseio.com",
    projectId: "james2-67f02",
    storageBucket: "james2-67f02.appspot.com",
    messagingSenderId: "687185436289",
    appId: "1:687185436289:web:9619aef2c902c70d613780"
  };
  firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };