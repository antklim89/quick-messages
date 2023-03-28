import { Text, IconButton, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { BsChatLeftFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IMessage } from '~/types';


const MessageAnswerButton: FC<IMessage> = ({ id, messagesCount, subject }) => {
    return (
        <IconButton
            aria-label={`show ${messagesCount} message answers`}
            as={Link}
            to={`answer/${subject.body}/${id}`}
            variant="ghost"
        >
            <>
                <Icon as={BsChatLeftFill} />
                <Text fontSize="xl" mx={1}>{messagesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageAnswerButton;
