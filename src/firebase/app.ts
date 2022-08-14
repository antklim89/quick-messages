import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: 'AIzaSyCLPc9jNnB92tlJzZngxMboODwmRXFeTzo',
    authDomain: 'quick-messages-56476.firebaseapp.com',
    projectId: 'quick-messages-56476',
    storageBucket: 'quick-messages-56476.appspot.com',
    messagingSenderId: '630631709069',
    appId: '1:630631709069:web:7b341d19b7e63771fc65c4',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
