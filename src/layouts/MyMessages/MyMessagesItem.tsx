import { Badge, Box, Divider, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from '~/requests-hooks';
import { IMessage } from '~/types';


const MyMessagesItem: FC<IMessage> = ({
    id, body, likesCount, favoritesCount, createdAt, author,
}) => {
    const { id: userId } = useUser();

    return (
        <Box as={Link} to={`/message/${id}`}>
            <Text fontSize="sm">
                {new Date(createdAt).toLocaleString()}
                {author.id === userId ? null : `by ${author.name}`}
            </Text>
            <HStack p={4} >
                <Text mr="auto">
                    {body}
                </Text>
                <Badge
                    alignItems="center"
                    colorScheme="red"
                    display="flex"
                    fontSize="md"
                    px={4}
                    variant="outline"
                >
                    <FaHeart />&nbsp;{likesCount}
                </Badge>
                <Badge
                    alignItems="center"
                    colorScheme="orange"
                    display="flex"
                    fontSize="md"
                    px={4}
                    variant="outline"
                >
                    <FaBookmark />&nbsp;{favoritesCount}
                </Badge>
            </HStack>
            <Divider mb={2} />
        </Box>
    );
};

export default MyMessagesItem;
