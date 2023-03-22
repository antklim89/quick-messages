import { Button, Container, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouteError } from 'react-router-dom';


const RouterError: FC = () => {
    const error = useRouteError();

    return (
        <Container>
            <Flex
                alignItems="center"
                flexDirection="column"
                height="100vh"
                justifyContent="center"
            >
                {
                    (error && typeof error === 'object' && 'status' in error && error.status === 404)
                        ? (
                            <Text fontSize="3xl">
                                404 | This page could not be found.
                            </Text>
                        )
                        : (
                            <>
                                <Text fontSize="3xl">
                                    Unexpected error.
                                </Text>
                                <Button onClick={() => (location.href = '/')}>Reload</Button>
                            </>
                        )
                }
            </Flex>
        </Container>
    );
};

export default RouterError;

