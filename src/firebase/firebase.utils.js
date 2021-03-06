import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


import { signInWithPopup } from "firebase/auth";


const config = {
    apiKey: "AIzaSyDhueGdvQREG3T5soWG6BtwLnVwxjIGciQ",
    authDomain: "crown-db-bc8d8.firebaseapp.com",
    projectId: "crown-db-bc8d8",
    storageBucket: "crown-db-bc8d8.appspot.com",
    messagingSenderId: "396956885975",
    appId: "1:396956885975:web:cbc4262f8a505830d62192",
    measurementId: "G-NY3WNYMBTE"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

// Exporting shop.data.js to Firebase - only once

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();     //firing batch request
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const tranformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return tranformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
/* export const signInWithGoogle = () => auth.signInWithPopup(provider); */ //popup box error on closing
export const signInWithGoogle = () => signInWithPopup(auth, provider).catch((error) => console.log(error));

export default firebase;