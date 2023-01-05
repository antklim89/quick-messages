import { IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaBookmark } from 'react-icons/fa';


const MessageFavoriteButton: FC = () => {
    return (
        <IconButton
            aria-label="bookmark"
            data-cy="message-favorite-button"
            flex="1 1 100%"
            variant="ghost"
        >
            <FaBookmark />
        </IconButton>
    );
};

export default MessageFavoriteButton;
