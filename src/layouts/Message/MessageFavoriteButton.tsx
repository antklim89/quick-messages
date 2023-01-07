import { IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { IMessage } from '~/types';


const MessageFavoriteButton: FC<IMessage> = ({ favoritesCount, inFavorites }) => {
    return (
        <IconButton
            aria-label="bookmark"
            color={inFavorites ? 'yellow.400' : 'primary.600'}
            data-cy="message-favorite-button"
            flex="1 1 100%"
            variant="ghost"
        >
            <>
                <FaBookmark />
                <Text color="primary.600" fontSize="xl" mx={1}>{favoritesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageFavoriteButton;
