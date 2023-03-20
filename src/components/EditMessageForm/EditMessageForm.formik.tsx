import { useFormik } from 'formik';
import { useMemo } from 'react';
import { EditMessageFormProps } from './EditMessageForm.types';
import { useCreateMessageRequest, useUpdateMessageRequest } from '~/requests-hooks';
import { editMessageSchema } from '~/schemas';
import { IEditMessageInput } from '~/types';


export function useEditMessageFormFormik({ message, id, answerToId }: EditMessageFormProps) {
    const { mutateAsync: createMessage } = useCreateMessageRequest({ answerToId });
    const { mutateAsync: updateMessage } = useUpdateMessageRequest({ answerToId });

    const initialValues = useMemo(() => ({
        body: message?.body || '',
    }), []);

    const formik = useFormik<IEditMessageInput>({
        initialValues,
        async onSubmit(values, { resetForm }) {
            if (id) {
                await updateMessage({ values, messageId: id });
            } else {
                await createMessage({ values });
                resetForm();
            }
        },
        async validate(values) {
            const result = await editMessageSchema.safeParseAsync(values);
            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
        validateOnMount: true,
    });

    return formik;
}
