import {
    Box, IconButton, Divider, HStack, Text, VStack,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaBookmark, FaHeart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfirmDialog from '~/components/ConfirmDialog';
import { useUser, useDeleteMessageRequest } from '~/requests-hooks';
import { IMessage } from '~/types';


const MyMessagesItem: FC<IMessage> = ({
    id, body, likesCount, favoritesCount, createdAt, author,
}) => {
    const { id: userId } = useUser();
    const { mutate, isLoading } = useDeleteMessageRequest({ messageId: id });

    const handleDeleteMessage = useCallback(() => mutate(), [mutate]);

    return (
        <Box>
            <Text as={Link} fontSize="sm" to={`/message/${id}`}>
                {new Date(createdAt).toLocaleString()}
                {author.id === userId ? null : `by ${author.name}`}
            </Text>
            <HStack gap={6} p={4}>
                <Text mr="auto">
                    {body}
                </Text>
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

                <VStack>
                    <Box
                        alignItems="center"
                        color="red"
                        display="flex"
                    >
                        <FaHeart />&nbsp;{likesCount}
                    </Box>
                    <Box
                        alignItems="center"
                        color="orange"
                        display="flex"
                    >
                        <FaBookmark />&nbsp;{favoritesCount}
                    </Box>
                </VStack>
            </HStack>
            <Divider mb={2} />
        </Box>
    );
};

export default MyMessagesItem;
