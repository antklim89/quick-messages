import {
    Flex, Text, Button, Accordion, AccordionItem, AccordionPanel, Spinner,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageProps } from './Message.types';
import MessageAnswerButton from './MessageAnswerButton';
import MessageFavoriteButton from './MessageFavoriteButton';
import MessageLikeButton from './MessageLikeButton';
import EditMessageForm from '~/components/EditMessageForm';
import { useFindMessageRequest } from '~/requests';
import { getRoute } from '~/utils';


const Message: FC<MessageProps> = ({ id, message }) => {
    const { data, isLoading } = useFindMessageRequest(id, message);

    if (!data || isLoading) return <Spinner />;

    const { author, body, createdAt, messages } = data;

    return (
        <Flex
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
            data-cy="message"
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
                        <EditMessageForm answerToId={id} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            {messages.length > 0 && (
                <Button
                    as={Link}
                    to={getRoute('message', { messageId: id })}
                    variant="ghost"
                    width="100%"
                >
                    Show {messages.length} Answers
                </Button>
            )}
        </Flex>
    );
};

export default Message;
