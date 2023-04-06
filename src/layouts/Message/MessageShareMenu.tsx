import { MenuItem } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';
import { IMessage } from '~/types';


const MessageShareMenu: FC<IMessage> = ({ author, body }) => {
    const handleShare: MouseEventHandler<HTMLButtonElement> = async () => {
        if (!navigator.share) return;
        try {
            await navigator.share({
                title: author.name,
                text: body,
                url: location.href,
            });
        } catch (error) {
            console.error(error);
        }

    };
    if (!navigator.share) return null;

    return (
        <MenuItem onClick={handleShare}>
            {String(navigator.share)}
        </MenuItem>
    );
};

export default MessageShareMenu;
