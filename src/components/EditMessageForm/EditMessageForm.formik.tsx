import { useFormik } from 'formik';
import { useMemo } from 'react';
import { EditMessageFormProps } from './EditMessageForm.types';
import { useCreateMessageRequest, useUpdateMessageRequest } from '~/requests';
import { editMessageSchema } from '~/schemas';
import { IEditMessageInput } from '~/types';


export function useEditMessageFormFormik({
    id,
    answerToId,
    messageBody,
    defaultSubject,
    subject,
    onSuccess,
}: EditMessageFormProps) {
    const { mutateAsync: createMessage } = useCreateMessageRequest({ answerToId });
    const { mutateAsync: updateMessage } = useUpdateMessageRequest({ answerToId });

    const initialValues = useMemo<IEditMessageInput>(() => ({
        body: messageBody || '',
        subjectBody: subject || defaultSubject || '',
    }), []);

    const formik = useFormik<IEditMessageInput>({
        initialValues,
        async onSubmit(values, { resetForm }) {
            if (id) {
                await updateMessage({ values, messageId: id });
            } else {
                await createMessage(values);
                resetForm();
            }
            onSuccess?.();
        },
        async validate(values) {
            const result = await editMessageSchema.safeParseAsync(values);
            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
        validateOnMount: true,
    });

    return formik;
}
