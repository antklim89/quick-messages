import { Text, IconButton, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { BsChatLeftFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IMessage } from '~/types';


const MessageAnswerButton: FC<IMessage> = ({ id, messagesCount }) => {
    return (
        <IconButton
            aria-label={`show ${messagesCount} message answers`}
            as={Link}
            to={`/message/${id}`}
            variant="ghost"
        >
            <>
                <Icon as={BsChatLeftFill} />
                <Text color="primary.600" fontSize="xl" mx={1}>{messagesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageAnswerButton;
