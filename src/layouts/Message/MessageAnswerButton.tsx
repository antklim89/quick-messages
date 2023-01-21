import { Text, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IMessage } from '~/types';


const MessageAnswerButton: FC<IMessage> = ({ id, messagesCount }) => {
    return (
        <IconButton
            aria-label={`show ${messagesCount} message answers`}
            as={Link}
            data-cy="message-answer-button"
            flex="1 1 100%"
            to={`message/${id}`}
            variant="ghost"
        >
            <>
                <FaComment />
                <Text color="primary.600" fontSize="xl" mx={1}>{messagesCount}</Text>
            </>
        </IconButton>
    );
};

export default MessageAnswerButton;
