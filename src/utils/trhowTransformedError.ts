import type { FirebaseError } from 'firebase/app';
import { ZodError } from 'zod';


const isFirebaseError = (error: unknown): error is FirebaseError => error instanceof Error && error.name === 'FirebaseError';

export function trhowTransformedError(error: unknown): never {
    if (error instanceof ZodError) {
        throw new Error(error.message);
    }
    if (isFirebaseError(error)) {
        const errorMessage = error.code.replace('/', ' error: ').replace(/-/g, ' ');
        throw new Error(errorMessage);
    }
    console.error(error);
    throw new Error('Unexpected error. Try again later.');
}
