import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { EditMessageFormProps } from './EditMessageForm.types';
import { useCreateMessageRequest, useUpdateMessageRequest } from '~/requests';
import { editMessageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput } from '~/types';


export function useEditMessageFormFormik({ message, id }: EditMessageFormProps) {
    const toast = useToast();
    const { mutateAsync: createMessage } = useCreateMessageRequest();
    const { mutateAsync: updateMessage } = useUpdateMessageRequest();

    const formik = useFormik<IEditMessageInput>({
        initialValues: {
            body: message?.body || '',
        },
        async onSubmit(submitValue, { resetForm }) {
            if (!(await supabase.auth.getSession()).data.session?.user) {
                toast({ description: 'You are not authenticated.', status: 'error' });
                return;
            }

            try {
                if (id) {
                    await updateMessage({ body: submitValue, messageId: id });
                } else {
                    await createMessage({ body: submitValue, answerToId: id });
                }
                resetForm();
                toast({ description: 'Message successfully posted.', status: 'success' });
            } catch (error) {
                if (error instanceof Error) toast({ description: `Error sending the message: "${error.message}". Try gain later.`, status: 'error' });
            }
        },
        async validate(val) {
            const result = await editMessageSchema.safeParseAsync(val);
            return result.success ? {} : result.error.formErrors.fieldErrors;
        },
    });

    return formik;
}
