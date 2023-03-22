import { Icon, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { MessageLikeButtonProps } from './MessageLikeButtonProps';
import { useLikeRequest } from '~/requests-hooks';


const MessageLikeButton: FC<MessageLikeButtonProps> = ({ message, ...props }) => {
    const { isLoading, mutate, data: { hasLiked, likesCount } } = useLikeRequest(message);

    return (
        <IconButton
            {...props}
            aria-label="like"
            isDisabled={isLoading}
            variant="ghost"
            onClick={() => mutate()}
        >
            <>
                <Icon as={hasLiked ? BsHeartFill : BsHeart} />
                <Text fontSize="xl" mx={1}>{likesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageLikeButton;
