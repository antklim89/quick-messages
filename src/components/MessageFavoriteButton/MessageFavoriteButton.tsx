import { Icon, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { MessageFavoriteButtonProps } from './MessageFavoriteButtonProps';
import { useFavoriteRequest } from '~/requests';


const MessageFavoriteButton: FC<MessageFavoriteButtonProps> = ({ message, ...props }) => {
    const { mutate, isLoading } = useFavoriteRequest(message);

    return (
        <IconButton
            {...props}
            aria-label="favorites"
            disabled={isLoading}
            variant="ghost"
            onClick={() => mutate()}
        >
            <>
                <Icon as={message.inFavorites ? BsBookmarkFill : BsBookmark} />
                <Text fontSize="xl" mx={1}>{message.favoritesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageFavoriteButton;
