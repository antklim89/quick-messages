import { AuthError } from 'firebase/auth';


export function trhowTransformedError(error: unknown): never {
    if ((error as AuthError).code) {
        const errorMessage = (error as AuthError).code.replace('/', ' error: ').replace(/-/g, ' ');
        throw new Error(errorMessage);
    }
    throw new Error('Unexpected error. Try again later.');
}
