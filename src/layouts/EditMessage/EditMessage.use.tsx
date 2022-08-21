import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ZodError } from 'zod';
import { EditMessageProps } from './EditMessage.types';
import { auth } from '~/firebase/app';
import { createMessageRequest, updateMessageRequest } from '~/firebase/messageRequests';
import { editMessageSchema } from '~/schemas';
import { IEditMessageInput } from '~/types';


export function useEditMessage({ message, id }: EditMessageProps) {
    const toast = useToast();

    const formik = useFormik<IEditMessageInput>({
        initialValues: {
            body: message?.body || '',
        },
        async onSubmit(submitValue, { resetForm }) {
            if (!auth.currentUser) {
                toast({ description: 'You are not authenticated.', status: 'error' });
                return;
            }

            try {
                if (id) {
                    await updateMessageRequest(id, { ...submitValue });
                } else {
                    await createMessageRequest(submitValue);
                }
                resetForm();
                toast({ description: 'Message successfully posted.', status: 'success' });
            } catch (error) {
                if (error instanceof Error) toast({ description: `Error sending the message: "${error.message}". Try gain later.`, status: 'error' });
            }
        },
        async validate(val) {
            try {
                await editMessageSchema.parseAsync(val);
            } catch (error) {
                if (error instanceof ZodError) return error.formErrors.fieldErrors;
            }
            return {};
        },
    });

    return { formik };
}
