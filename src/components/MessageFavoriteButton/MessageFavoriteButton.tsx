import { IconButton, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useFavoriteRequest } from '~/requests-hooks';
import { IMessage } from '~/types';


const MessageFavoriteButton: FC<IMessage> = (message) => {
    const { mutate, isLoading, data: { favoritesCount, inFavorites } } = useFavoriteRequest(message);

    const handleFavorites = useCallback(() => {
        mutate();
    }, []);

    return (
        <IconButton
            aria-label="bookmark"
            color={inFavorites ? 'orange.700' : 'primary.600'}
            data-cy="message-favorite-button"
            disabled={isLoading}
            flex="1 1 100%"
            variant="ghost"
            onClick={handleFavorites}
        >
            <>
                <FaBookmark />
                <Text fontSize="xl" mx={1}>{favoritesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageFavoriteButton;
