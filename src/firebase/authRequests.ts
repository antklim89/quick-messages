import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from './app';
import { LoginInput, RegisterInput } from '~/types';
import { trhowTransformedError } from '~/utils/trhowTransformedError';


export async function registerRequest({ email, password, name }: RegisterInput) {
    try {
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(createdUser.user, { displayName: name });
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

