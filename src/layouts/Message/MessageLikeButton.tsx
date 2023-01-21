import { IconButton, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useLikeRequest } from '~/requests-hooks';
import { IMessage } from '~/types';


const MessageLikeButton: FC<IMessage> = ({ id: messageId, hasLiked, likesCount }) => {
    const { isLoading, mutate } = useLikeRequest({ messageId });

    const handleLike = useCallback(() => {
        mutate({ hasLiked });
    }, [hasLiked]);

    return (
        <IconButton
            aria-label="like"
            color={hasLiked ? 'red.600' : 'primary.600'}
            data-cy="message-like-button"
            flex="1 1 100%"
            isDisabled={isLoading}
            variant="ghost"
            onClick={handleLike}
        >
            <>
                <FaHeart />
                <Text fontSize="xl" mx={1}>{likesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageLikeButton;
