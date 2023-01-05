import { IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaHeart } from 'react-icons/fa';


const MessageLikeButton: FC = () => {
    return (
        <IconButton
            aria-label="like"
            data-cy="message-like-button"
            flex="1 1 100%"
            variant="ghost"
        >
            <FaHeart />
        </IconButton>
    );
};

export default MessageLikeButton;
