import { IconButtonProps } from '@chakra-ui/react';
import { IMessage } from '~/types';


export interface MessageFavoriteButtonProps extends Partial<IconButtonProps> {
    message: IMessage
}
