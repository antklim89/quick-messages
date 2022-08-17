import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from './app';
import { trhowTransformedError } from '~/utils/trhowTransformedError';


export async function registerRequest({ email, password, name }: {email: string, password: string, name: string}) {
    try {
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(createdUser.user, { displayName: name });
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function loginRequest({ email, password }: {email: string, password: string}) {
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

