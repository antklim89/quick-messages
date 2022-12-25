import { AccordionButton, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaComment } from 'react-icons/fa';


const MessageAnswerButton: FC = () => {
    return (
        <AccordionButton
            aria-label="answer"
            as={IconButton}
            flex="1 1 100%"
            variant="ghost"
        >
            <FaComment />
        </AccordionButton>
    );
};

export default MessageAnswerButton;
