import { IconButton, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfirmDialog from '~/components/ConfirmDialog';
import DateComponent from '~/components/DateComponent';
import MessageFavoriteButton from '~/components/MessageFavoriteButton';
import MessageLikeButton from '~/components/MessageLikeButton';
import { useDeleteMessageRequest } from '~/requests-hooks';
import { IMessage } from '~/types';


const MyMessagesItem: FC<IMessage> = (message) => {
    const { id, body, createdAt } = message;
    const { mutate, isLoading } = useDeleteMessageRequest({ messageId: id });

    const handleDeleteMessage = useCallback(() => mutate(), []);

    return (
        <>
            <VStack mt={4}>
                <VStack
                    alignItems="flex-start"
                    as={Link}
                    to={`/message/${id}`}
                    width="100%"
                >
                    <DateComponent date={createdAt} fontSize="sm" />
                    <Text fontSize="xl" mr="auto">
                        {body}
                    </Text>
                </VStack>

                <HStack gap={2} justifyContent="space-between" width="100%">
                    <ConfirmDialog
                        isLoading={isLoading}
                        message="Are you sure you want to delete message!"
                        onConfirm={handleDeleteMessage}
                    >
                        {(toggle) => (
                            <IconButton
                                aria-label="delete message"
                                colorScheme="red"
                                isLoading={isLoading}
                                variant="ghost"
                                onClick={toggle}
                            >
                                <FaTrash />
                            </IconButton>
                        )}
                    </ConfirmDialog>
                    <MessageFavoriteButton message={message} />
                    <MessageLikeButton message={message} />
                </HStack>
            </VStack>
            <Divider />
        </>
    );
};

export default MyMessagesItem;
