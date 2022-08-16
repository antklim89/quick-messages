import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ZodError } from 'zod';
import { authSchema } from './Auth.schemas';
import { AuthProps, AuthType } from './Auth.types';
import { login, register } from '~/firebase/auth';


export function useAuth({ type = 'login' }: AuthProps) {
    const toast = useToast();

    const formik = useFormik<AuthType>({
        initialValues: { email: '', password: '', confirm: '' },
        async onSubmit(val) {
            try {
                if (type === 'login') {
                    await login(val);
                    toast({ title: 'You have successfully logged in!', status: 'success' });
                } else {
                    await register(val);
                    toast({ title: 'You have successfully registred!', status: 'success' });
                }
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
        async validate(val) {
            try {
                if (type === 'login') {
                    await authSchema.pick({ email: true, password: true }).parseAsync(val);
                } else {
                    await authSchema.pick({ email: true, password: true }).parseAsync(val);
                    if (val.confirm !== val.password) return { confirm: 'Passwords do not match.' };
                }
            } catch (error) {
                if (error instanceof ZodError) return error.formErrors.fieldErrors;
            }
            return {};
        },
    });

    return { formik };
}
