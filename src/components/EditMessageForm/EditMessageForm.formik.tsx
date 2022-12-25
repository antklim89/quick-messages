import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { EditMessageFormProps } from './EditMessageForm.types';
import { createMessageRequest, updateMessageRequest } from '~/requests/messageRequests';
import { editMessageSchema } from '~/schemas';
import supabase from '~/supabase/app';
import { IEditMessageInput, IMessage } from '~/types';


export function useEditMessageFormFormik({ message, id }: EditMessageFormProps) {
    const toast = useToast();
    const queryClient = useQueryClient();

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
                    await updateMessageRequest(id, { ...submitValue });
                } else {
                    const data = await createMessageRequest(submitValue);
                    const prevData = queryClient.getQueryData<IMessage[]>(['messages_list']);
                    queryClient.setQueryData<IMessage[]>(['messages_list'], [data, ...(prevData || [])]);
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
