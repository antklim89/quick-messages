import { IconButton, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { MessageLikeButtonProps } from './MessageLikeButtonProps';
import { useLikeRequest } from '~/requests-hooks';


const MessageLikeButton: FC<MessageLikeButtonProps> = ({ message, ...props }) => {
    const { isLoading, mutate, data: { hasLiked, likesCount } } = useLikeRequest(message);

    const handleLike = useCallback(() => {
        mutate();
    }, []);

    return (
        <IconButton
            {...props}
            aria-label="like"
            color={hasLiked ? 'red.600' : 'primary.600'}
            data-cy="message-like-button"
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
