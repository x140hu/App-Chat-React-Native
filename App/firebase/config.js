import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { analyticts, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBhLWqVOP8FJ6_9LpbqrQC2CLg0KXXfkes",
    authDomain: "chat-app-9d8ae.firebaseapp.com",
    projectId: "chat-app-9d8ae",
    storageBucket: "chat-app-9d8ae.appspot.com",
    messagingSenderId: "649376006877",
    appId: "1:649376006877:web:6bf367ee85b66d543c5134",
    measurementId: "G-TYQLJ9PEM6"
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const db = getFirestore(firebase);





export { auth, db, firebase, analytics };