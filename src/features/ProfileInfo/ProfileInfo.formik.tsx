import { useFormik } from 'formik';
import { useUpdateProfile } from '~/requests';
import { profileEditSchema } from '~/schemas';
import { IProfile } from '~/types';


export function useProfileInfoFormik(initialValues: IProfile) {
    const { mutateAsync: updateProfile } = useUpdateProfile();

    const formik = useFormik<IProfile>({
        initialValues,
        async onSubmit(values) {
            await updateProfile(values);
        },
        async validate(values) {
            const result = await profileEditSchema.safeParseAsync(values);
            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
    });

    return formik;
}
