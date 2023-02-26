import { IconButtonProps } from '@chakra-ui/react';
import { IMessage } from '~/types';


export interface MessageLikeButtonProps extends Partial<IconButtonProps> {
    message: IMessage
}
