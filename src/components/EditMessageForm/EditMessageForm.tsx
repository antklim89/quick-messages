import { Flex, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useEditMessageFormFormik } from './EditMessageForm.formik';
import { EditMessageFormProps } from './EditMessageForm.types';
import InputField from '~/components/InputField';


const EditMessageForm: FC<EditMessageFormProps> = (props) => {
    const formik = useEditMessageFormFormik(props);

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputField
                as="textarea"
                data-cy="message-body-input"
                formik={formik}
                name="body"
                placeholder="Enter your message..."
                resize="none"
            />
            <Flex justifyContent="end">
                <Button
                    data-cy="submit-message-button"
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    type="submit"
                >
                    Send
                </Button>
            </Flex>
        </form>
    );
};

export default EditMessageForm;


