import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDhueGdvQREG3T5soWG6BtwLnVwxjIGciQ",
    authDomain: "crown-db-bc8d8.firebaseapp.com",
    projectId: "crown-db-bc8d8",
    storageBucket: "crown-db-bc8d8.appspot.com",
    messagingSenderId: "396956885975",
    appId: "1:396956885975:web:cbc4262f8a505830d62192",
    measurementId: "G-NY3WNYMBTE"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;