import Rebase from 're-base';
import firebase from 'firebase'; 

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDMEWDT8wG6tKquZvB2ewVDJQrpOYpuBKE",
    authDomain: "catch-of-the-day-927ed.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-927ed.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;   