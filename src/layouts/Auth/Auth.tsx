import {
    Heading, Container, Flex, Button,
} from '@chakra-ui/react';
import { FC } from 'react';
import { AuthProps } from './Auth.types';
import { useAuth } from './Auth.use';
import InputField from '~/components/InputField';


const Auth: FC<AuthProps> = ({ type = 'login' }) => {
    const { formik } = useAuth({ type });

    return (
        <Container
            boxShadow="md" height="100%" maxWidth="container.md"
            mt={24}
            padding={8}
        >
            <Heading mb={4} textTransform="capitalize">{type}</Heading>

            <form onSubmit={formik.handleSubmit}>
                {type === 'register' && (
                    <InputField
                        autoComplete="username"
                        formik={formik}
                        name="name"
                        placeholder="Confirm your username..."
                    />
                )}
                <InputField
                    autoComplete="email"
                    formik={formik}
                    name="email"
                    placeholder="Enter your e-mail..."
                />
                <InputField
                    autoComplete="new-password"
                    formik={formik}
                    name="password"
                    placeholder="Enter your password..."
                    type="password"
                />
                {type === 'register' && (
                    <InputField
                        autoComplete="new-password"
                        formik={formik}
                        name="confirm"
                        placeholder="Confirm your password..."
                        type="password"
                    />
                )}
                <Flex justifyContent="end">
                    <Button disabled={!formik.isValid} isLoading={formik.isSubmitting} type="submit">
                        Confirm
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};

export default Auth;


