import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Button } from '@chakra-ui/react';
import { FC } from 'react';
import EditMessageForm from '~/components/EditMessageForm';
import { useUser } from '~/requests';


const MessageListCreateNew: FC = () => {
    const { isAuth } = useUser();

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
                <AccordionButton
                    as={Button}
                    data-cy="message-list-add-new-message"
                    justifyContent="center"
                    variant="ghost"
                >
                    Add New Message
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <EditMessageForm />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default MessageListCreateNew;
