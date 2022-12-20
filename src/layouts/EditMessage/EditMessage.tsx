import {
    Heading, Container, Flex, Button,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useEditMessageFormik } from './EditMessage.formik';
import { EditMessageProps } from './EditMessage.types';
import InputField from '~/components/InputField';


const EditMessage: FC<EditMessageProps> = (props) => {
    const formik = useEditMessageFormik(props);

    return (
        <Container
            boxShadow="md" height="100%" maxWidth="container.md"
            mt={24}
            padding={8}
        >
            <Heading mb={4} textTransform="capitalize">{props.message ? 'Edit message' : 'Create message'}</Heading>
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
        </Container>
    );
};

export default EditMessage;


