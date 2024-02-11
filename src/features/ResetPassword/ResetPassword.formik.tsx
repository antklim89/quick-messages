import { useFormik } from 'formik';
import { useEffect } from 'react';
import { z } from 'zod';
import { useResetPassword, useUser } from '~/requests';


export function useResetPasswordFormik() {
    const { mutate: resetPassword } = useResetPassword();
    const { email } = useUser();

    const formik = useFormik<{ email: string }>({
        initialValues: {
            email: '',
        },
        async onSubmit(values) {
            await resetPassword(values);
        },
        async validate(value) {
            const result = await z.object({ email: z.string().email() }).safeParseAsync(value);

            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
        validateOnMount: true,
    });

    useEffect(() => {
        formik.setFieldValue('email', email);
    }, [email]);

    return formik;
}
