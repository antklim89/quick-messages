import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';


const NotFound: FC = () => {
    return (
        <Flex
            justifyContent="center"
            position="fixed"
            top="50%"
            width="100%"
        >
            <Text fontSize="3xl">
                404 | This page could not be found.
            </Text>
        </Flex>
    );
};

export default NotFound;

