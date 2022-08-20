import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore/lite';
import { auth, db } from './app';
import { LoginInput, RegisterInput } from '~/types';
import { trhowTransformedError } from '~/utils/trhowTransformedError';


export async function registerRequest({ email, password, name }: RegisterInput) {
    try {
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'profiles', createdUser.user.uid), { name });
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function loginRequest({ email, password }: LoginInput) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function logoutRequest() {
    try {
        await signOut(auth);
    } catch (error) {
        trhowTransformedError(error);
    }
}

