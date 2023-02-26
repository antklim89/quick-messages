import { IconButton, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { MessageFavoriteButtonProps } from './MessageFavoriteButtonProps';
import { useFavoriteRequest } from '~/requests-hooks';


const MessageFavoriteButton: FC<MessageFavoriteButtonProps> = ({ message, ...props }) => {
    const { mutate, isLoading, data: { favoritesCount, inFavorites } } = useFavoriteRequest(message);

    const handleFavorites = useCallback(() => {
        mutate();
    }, []);

    return (
        <IconButton
            {...props}
            aria-label="favorites"
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
