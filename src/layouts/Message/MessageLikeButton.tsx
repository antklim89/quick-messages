import { IconButton } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useLikeRequest } from '~/requests/likeRequest';
import { IMessage } from '~/types';


const MessageLikeButton: FC<IMessage> = ({ id: messageId }) => {
    const { isLoading, mutate } = useLikeRequest({ message: messageId });

    const handleLike = useCallback(() => {
        mutate();
    }, []);

    return (
        <IconButton
            aria-label="like"
            data-cy="message-like-button"
            flex="1 1 100%"
            isLoading={isLoading}
            variant="ghost"
            onClick={handleLike}
        >
            <FaHeart />
        </IconButton>
    );
};

export default MessageLikeButton;
