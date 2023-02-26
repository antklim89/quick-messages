import { Divider, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import { IMessage } from '~/types';


const MyFavoritesItem: FC<IMessage> = (message) => {
    const { id, body, createdAt } = message;

    return (
        <>
            <HStack>
                <VStack
                    alignItems="flex-start"
                    as={Link}
                    to={`/message/${id}`}
                    width="100%"
                >
                    <Text fontSize="sm">
                        {new Date(createdAt).toLocaleString()}
                    </Text>
                    <Text mr="auto">
                        {body}
                    </Text>
                </VStack>
                <HStack gap={6} p={4}>
                    <VStack>
                        <MessageLikeButton message={message} />
                        <MessageFavoriteButton message={message} />
                    </VStack>
                </HStack>
            </HStack>
            <Divider />
        </>
    );
};

export default MyFavoritesItem;
