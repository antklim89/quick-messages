import { Divider, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import DateComponent from '~/components/DateComponent';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import { useUser } from '~/requests-hooks';
import { IMessage } from '~/types';


const MyFavoritesItem: FC<IMessage> = (message) => {
    const { id, body, createdAt, author } = message;
    const { id: userId } = useUser();

    return (
        <>
            <HStack>
                <VStack
                    alignItems="flex-start"
                    as={Link}
                    to={`/message/${id}`}
                    width="100%"
                >
                    <DateComponent date={createdAt} fontSize="sm" />
                    <Text fontSize="sm">{author.id === userId ? null : `by ${author.name}`}</Text>
                    <Text fontSize="xl" mr="auto">
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
