import {
    Heading, Container, Flex, Button,
} from '@chakra-ui/react';
import { FC } from 'react';
import { EditMessageProps } from './EditMessage.types';
import { useEditMessage } from './EditMessage.use';
import InputField from '~/components/InputField';


const EditMessage: FC<EditMessageProps> = (props) => {
    const { formik } = useEditMessage(props);

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
                    formik={formik}
                    name="body"
                    placeholder="Enter your message..."
                    resize="none"
                />
                <Flex justifyContent="end">
                    <Button disabled={!formik.isValid} isLoading={formik.isSubmitting} type="submit">
                        Confirm
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};

export default EditMessage;


