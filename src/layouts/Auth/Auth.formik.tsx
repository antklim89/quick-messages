import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { AuthProps, AuthSchemaType } from './Auth.types';
import { loginRequest, registerRequest } from '~/requests/authRequests';
import { authInputSchema } from '~/schemas';


export function useAuthFormik({ type = 'login' }: AuthProps) {
    const toast = useToast();

    const formik = useFormik<AuthSchemaType & { confirm: string }>({
        initialValues: {
            email: import.meta.env.DEV ? 't@t.com' : '',
            password: import.meta.env.DEV ? 'qwer1234' : '',
            confirm: import.meta.env.DEV ? 'qwer1234' : '',
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
            const result = await authInputSchema.safeParseAsync(val);
            if (type === 'register') {
                if (val.confirm !== val.password) return { confirm: 'Passwords do not match.' };
            }

            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
    });

    return formik;
}
