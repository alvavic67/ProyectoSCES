import firebase from "firebase";

const config = {
  googlemapskey: "AIzaSyBxcEbnw5ZjevO33SNP8gmZ0hBo6PsSi5I",
  firebaseConfig: {
    apiKey: "AIzaSyCidy5U6JSR159IaN90AmC0mFNyIZf61fY",
    authDomain: "sces-4c69c.firebaseapp.com",
    databaseURL: "https://sces-4c69c.firebaseio.com",
    projectId: "sces-4c69c",
    storageBucket: "sces-4c69c.appspot.com",
    messagingSenderId: "941504175591",
    appId: "1:941504175591:web:4d2811d3e09290f940b142"
  }
};

var app = firebase.initializeApp(config.firebaseConfig);
export { config, app };
