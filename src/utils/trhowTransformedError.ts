import { ZodError } from 'zod';


export function trhowTransformedError(error: unknown): never {
    if (error instanceof ZodError) {
        throw new Error(error.message);
    }
    console.error(error);
    throw new Error('Unexpected error. Try again later.');
}
