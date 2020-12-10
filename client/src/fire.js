import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAJCvosHG7UjvpmmBg8jyFkNHRpZuVnhnU",
    authDomain: "management-f4fd6.firebaseapp.com",
    databaseURL: "https://management-f4fd6.firebaseio.com",
    projectId: "management-f4fd6",
    storageBucket: "management-f4fd6.appspot.com",
    messagingSenderId: "721447555462",
    appId: "1:721447555462:web:aa4f742fad43ed6f9b9c07"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;