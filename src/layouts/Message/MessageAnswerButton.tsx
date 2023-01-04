import { Text, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IMessage } from '~/types';
import { getRoute } from '~/utils';


const MessageAnswerButton: FC<IMessage> = ({ id, messages }) => {
    return (
        <IconButton
            aria-label={`show ${messages.length} message answers`}
            as={Link}
            flex="1 1 100%"
            to={getRoute('message', { messageId: id })}
            variant="ghost"
        >
            <>
                <FaComment />
                <Text color="primary.600" fontSize="xl" mx={1}>{messages.length}</Text>
            </>
        </IconButton>
    );
};

export default MessageAnswerButton;
