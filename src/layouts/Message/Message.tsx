import { Flex, Text, IconButton, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { FaBookmark, FaHeart, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IMessage } from '~/types';


const Message: FC<IMessage> = ({ body, author, createdAt }) => {
    return (
        <Flex
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
            flexDirection="column"
            my={4}
        >
            <Flex
                flexDirection={['column', 'row']}
                justifyContent="space-between"
                p={4}
            >
                <Link to={`/user/${author.id}`}>
                    <Text fontSize={['xl', '2xl']}>{author.name}</Text>
                </Link>
                <Text fontSize={['xs', 'sm']}>{new Date(createdAt).toLocaleString()}</Text>
            </Flex>
            <Text my={4} p={4}>
                {body}
            </Text>
            <Flex>
                <IconButton aria-label="bookmark" flex="1 1 100%" variant="ghost">
                    <FaBookmark />
                </IconButton>
                <IconButton aria-label="like" flex="1 1 100%" variant="ghost">
                    <FaHeart />
                </IconButton>
                <IconButton aria-label="reply" flex="1 1 100%" variant="ghost">
                    <FaComment />
                </IconButton>
            </Flex>
            <Button variant="ghost" width="100%">
                Show Answers
            </Button>
        </Flex>
    );
};

export default Message;
