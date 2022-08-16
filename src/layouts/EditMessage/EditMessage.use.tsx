import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ZodError } from 'zod';
import { editMessageSchema } from './EditMessage.schemas';
import { EditMessageProps, EditMessageType } from './EditMessage.types';


export function useEditMessage({ message }: EditMessageProps) {
    const toast = useToast();

    const formik = useFormik<EditMessageType>({
        initialValues: {
            body: message?.body || '',
        },
        async onSubmit(val) {


            toast({ description: 'Message successfully posted.', status: 'success' });
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
