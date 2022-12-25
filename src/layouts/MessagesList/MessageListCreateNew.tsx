import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Button } from '@chakra-ui/react';
import { FC } from 'react';
import EditMessageForm from '~/components/EditMessageForm';


const MessageListCreateNew: FC = () => {
    return (
        <Accordion
            allowToggle
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
        >
            <AccordionItem border="none">
                <AccordionButton as={Button} justifyContent="center" variant="ghost">
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
