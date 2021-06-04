import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6QZalF29i4WFaZVf-WIuFqt57aYh3ZjM",
    authDomain: "education-sevice-b69f4.firebaseapp.com",
    projectId: "education-sevice-b69f4",
    storageBucket: "education-sevice-b69f4.appspot.com",
    messagingSenderId: "61366683616",
    appId: "1:61366683616:web:767c75ba8483e3007d0d85",
    measurementId: "G-49RV0RRVB1"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export { storage, firebase as default };