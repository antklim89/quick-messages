import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ZodError } from 'zod';
import { EditMessageProps, EditMessageType } from './EditMessage.types';
import { createMessageRequest, updateMessageRequest } from '~/firebase/messageRequests';
import { useUser } from '~/hooks';
import { editMessageSchema } from '~/schemas';


export function useEditMessage({ message, id }: EditMessageProps) {
    const toast = useToast();
    const { user } = useUser();

    const formik = useFormik<EditMessageType>({
        initialValues: {
            body: message?.body || '',
        },
        async onSubmit(submitValue) {
            if (!user) {
                toast({ description: 'You are not authenticated.', status: 'error' });
                return;
            }

            try {
                if (id) {
                    await updateMessageRequest(id, {
                        ...submitValue,
                    });
                } else {
                    await createMessageRequest({
                        ...submitValue,
                        author: user.uid,
                    });
                }

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
