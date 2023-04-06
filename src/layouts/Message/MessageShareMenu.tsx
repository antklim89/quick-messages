import { MenuItem } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';
import { IMessage } from '~/types';


const MessageShareMenu: FC<IMessage> = ({ author, body, subject, id }) => {
    const handleShare: MouseEventHandler<HTMLButtonElement> = async () => {
        if (!navigator.share) return;
        try {
            await navigator.share({
                title: `${author.name}'s message.`,
                text: body,
                url: `${location.origin}/answer/${subject.body}/${id}`,
            });
        } catch (error) {
            console.error(error);
        }

    };
    if (!navigator.share) return null;

    return (
        <MenuItem onClick={handleShare}>
            Share
        </MenuItem>
    );
};

export default MessageShareMenu;
