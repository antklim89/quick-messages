import { useFormik } from 'formik';
import { AuthProps, AuthSchemaType } from './Auth.types';
import { useLoginRequest, useRegisterRequest } from '~/requests-hooks';
import { authInputSchema } from '~/schemas';


export function useAuthFormik({ defaultType: type = 'login' }: AuthProps) {
    const { mutateAsync: login } = useLoginRequest();
    const { mutateAsync: register } = useRegisterRequest();

    const formik = useFormik<AuthSchemaType & { confirm: string }>({
        initialValues: {
            email: import.meta.env.DEV ? 't@t.com' : '',
            password: import.meta.env.DEV ? 'qwer1234' : '',
            confirm: import.meta.env.DEV ? 'qwer1234' : '',
        },
        async onSubmit(val) {
            if (type === 'login') await login(val).catch(() => null);
            else await register(val).catch(() => null);
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
