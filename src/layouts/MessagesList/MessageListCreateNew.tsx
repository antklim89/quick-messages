import {
    Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Skeleton,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import EditMessageForm from '~/components/EditMessageForm';
import { useUser } from '~/requests-hooks';


const MessageListCreateNew: FC<{isLoading?: boolean}> = ({ isLoading = false }) => {
    const { isAuth } = useUser();
    const params = useParams();
    const answerToId = z.coerce.number().optional().parse(params.messageId);

    if (!isAuth) return null;
    return (
        <Accordion
            allowToggle
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
        >
            <AccordionItem border="none">
                <Skeleton isLoaded={!isLoading}>
                    <AccordionButton
                        as={Button}
                        data-cy="message-list-add-new-message"
                        justifyContent="center"
                        variant="ghost"
                    >
                        Add New Message
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <EditMessageForm answerToId={answerToId} />
                    </AccordionPanel>
                </Skeleton>
            </AccordionItem>
        </Accordion>
    );
};

export default MessageListCreateNew;
