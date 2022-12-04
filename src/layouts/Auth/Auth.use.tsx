import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { AuthProps, RegisterSchemaType } from './Auth.types';
import { registerSchema, loginSchema } from '~/schemas';
import { loginRequest, registerRequest } from '~/supabase/authRequests';


export function useAuth({ type = 'login' }: AuthProps) {
    const toast = useToast();
    const navigate = useNavigate();

    const formik = useFormik<RegisterSchemaType & { confirm: string }>({
        initialValues: {
            email: IS_DEV ? 't@t.com' : '',
            password: IS_DEV ? 'qwer123' : '',
            confirm: IS_DEV ? 'qwer123' : '',
            name: IS_DEV ? 'John' : '',
        },
        async onSubmit(val) {
            if (type === 'login') {
                const { error } = await loginRequest(val);
                if (error) toast({ title: error.message, status: 'error' });
                else toast({ title: 'You have successfully logged in!', status: 'success' });
            } else {
                const { error } = await registerRequest(val);
                if (error) toast({ title: error.message, status: 'error' });
                else toast({ title: 'You have successfully registred!', status: 'success' });
            }
            navigate('/');
            navigate(0);
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
