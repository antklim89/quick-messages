import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    AuthError,
    signOut,
} from 'firebase/auth';
import { auth } from './app';
import { trhowTransformedError } from '~/utils/trhowTransformedError';


export async function registerRequest({ email, password }: {email: string, password: string}) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        const errorMessage = (error as AuthError).code.replace('/', ' error: ').replace(/-/g, ' ');
        throw new Error(errorMessage);
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

