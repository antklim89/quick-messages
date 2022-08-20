import { Heading, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { MessagesListItemProps } from './MessagesList.types';


const MessagesListItem: FC<MessagesListItemProps> = ({ body, author, createdAt }) => {
    return (
        <Flex boxShadow="lg" flexDirection="column" p={4}>
            <header>
                {/* <Text>{author}</Text> */}
            </header>
            <Text
                bg="gray.50"
                border="1px solid rgba(0,0,0,0.2)"
                borderRadius="md"
                my={4}
                p={4}
            >
                {body}
            </Text>
        </Flex>
    );
};

export default MessagesListItem;
