import { useFormik } from 'formik';
import { useUpdateProfie } from '~/requests-hooks';
import { profileInputSchema } from '~/schemas';
import { IProfile } from '~/types';


export function useProfileInfoFormik(initialValues: IProfile) {
    const { mutateAsync: updateProfile } = useUpdateProfie();

    const formik = useFormik<IProfile>({
        initialValues,
        async onSubmit(values) {
            await updateProfile(values);
        },
        async validate(values) {
            const result = await profileInputSchema.safeParseAsync(values);
            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
    });

    return formik;
}
