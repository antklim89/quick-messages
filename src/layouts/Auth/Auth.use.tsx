import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ZodError } from 'zod';
import { AuthProps, RegisterSchemaType } from './Auth.types';
import { registerSchema, loginSchema } from '~/schemas';
import { loginRequest, registerRequest } from '~/supabase/authRequests';


export function useAuth({ type = 'login' }: AuthProps) {
    const toast = useToast();

    const formik = useFormik<RegisterSchemaType & { confirm: string }>({
        initialValues: {
            email: import.meta.env.DEV ? 't@t.com' : '',
            password: import.meta.env.DEV ? 'qwer1234' : '',
            confirm: import.meta.env.DEV ? 'qwer1234' : '',
            name: import.meta.env.DEV ? 'anton' : '',
        },
        async onSubmit(val) {
            try {
                if (type === 'login') {
                    await loginRequest(val);
                    toast({ title: 'You have successfully logged in!', status: 'success' }); // window.location.assign('/');

                } else {
                    await registerRequest(val);
                    toast({ title: 'You have successfully registred!', status: 'success' });
                }
                window.location.assign('/');
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
        async validate(val) {
            try {
                if (type === 'login') {
                    await loginSchema.parseAsync(val);
                } else {
                    await registerSchema.parseAsync(val);
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
