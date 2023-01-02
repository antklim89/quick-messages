import {
    Flex, Text, Button, Accordion, AccordionItem, AccordionPanel,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import MessageAnswerButton from './MessageAnswerButton';
import MessageFavoriteButton from './MessageFavoriteButton';
import MessageLikeButton from './MessageLikeButton';
import EditMessageForm from '~/components/EditMessageForm';
import { IMessage } from '~/types';


const Message: FC<IMessage> = ({ body, author, createdAt }) => {
    return (
        <Flex
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
            flexDirection="column"
            my={4}
        >
            <Flex
                flexDirection={['column', 'row']}
                justifyContent="space-between"
                p={4}
            >
                <Link to={`/user/${author.id}`}>
                    <Text as="pre" fontSize={['xl', '2xl']} wordBreak="break-all">{author.name}</Text>
                </Link>
                <Text fontSize={['xs', 'sm']}>{new Date(createdAt).toLocaleString()}</Text>
            </Flex>
            <Text my={4} p={4}>
                {body}
            </Text>

            <Accordion allowToggle>
                <AccordionItem border="none">
                    <Flex>
                        <MessageFavoriteButton />
                        <MessageLikeButton />
                        <MessageAnswerButton />
                    </Flex>
                    <AccordionPanel pb={4}>
                        <EditMessageForm />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Button variant="ghost" width="100%">
                Show Answers
            </Button>
        </Flex>
    );
};

export default Message;