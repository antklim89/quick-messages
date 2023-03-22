import { Icon, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { MessageFavoriteButtonProps } from './MessageFavoriteButtonProps';
import { useFavoriteRequest } from '~/requests-hooks';


const MessageFavoriteButton: FC<MessageFavoriteButtonProps> = ({ message, ...props }) => {
    const { mutate, isLoading, data: { favoritesCount, inFavorites } } = useFavoriteRequest(message);

    return (
        <IconButton
            {...props}
            aria-label="favorites"
            disabled={isLoading}
            variant="ghost"
            onClick={() => mutate()}
        >
            <>
                <Icon as={inFavorites ? BsBookmarkFill : BsBookmark} />
                <Text fontSize="xl" mx={1}>{favoritesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageFavoriteButton;
