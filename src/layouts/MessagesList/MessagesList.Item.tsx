import { Heading, Flex, Text, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaBookmark, FaHeart, FaReply } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MessagesListItemProps } from './MessagesList.types';


const MessagesListItem: FC<MessagesListItemProps> = ({ body, author, createdAt }) => {
    return (
        <Flex
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
            flexDirection="column"
            m={4}
        >
            <Heading
                as="h5"
                display="flex"
                fontSize="md"
                justifyContent="space-between"
                p={4}
            >
                <Link to={`/user/${author.id}`}>
                    <Text fontSize="xl">{author.name}</Text>
                </Link>
                <Text>{new Date(createdAt).toLocaleString()}</Text>
            </Heading>
            <Text my={4} p={4}>
                {body}
            </Text>
            <Flex>
                <IconButton aria-label="reply" flex="1 1 100%" variant="ghost">
                    <FaReply />
                </IconButton>
                <IconButton aria-label="like" flex="1 1 100%" variant="ghost">
                    <FaHeart />
                </IconButton>
                <IconButton aria-label="bookmark" flex="1 1 100%" variant="ghost">
                    <FaBookmark />
                </IconButton>
            </Flex>
        </Flex>
    );
};

export default MessagesListItem;
