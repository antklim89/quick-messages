import { Container } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import MessageListCreateNew from './MessagesListCreateNew';
import MessageSkeleton from '~/components/MessageSkeleton';
import Message from '~/features/Message/Message';
import MessageAuthor from '~/features/MessageAuthor';
import SubjectsList from '~/features/SubjectsList';
import { useEndScreenTrigger } from '~/hooks';
import { MESSAGES_LIMIT, useFindMessagesRequest } from '~/requests';
import { messageParamsSchema } from '~/schemas';


const MessagesList: FC = () => {
    const { answerToId, authorId, subjectBody } = messageParamsSchema.parse(useParams());

    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        data: { pages } = { pages: [] },
    } = useFindMessagesRequest({ answerToId, authorId, subjectBody });

    useEndScreenTrigger(fetchNextPage, (!isFetching && (pages.at(-1)?.length || 0) >= MESSAGES_LIMIT), 1000);

    return (
        <Container my={[4, 6]} p={[0, 2]}>
            {answerToId ? <Message isMain id={answerToId} /> : null}
            <SubjectsList />
            {authorId ? <MessageAuthor authorId={authorId} /> : <MessageListCreateNew isLoading={isLoading} /> }

            {isLoading
                ? Array.from({ length: 10 }, (_, i) => <MessageSkeleton key={i} />)
                : pages.map((messagePages) => (
                    <Fragment key={messagePages[0]?.id || 0}>
                        {messagePages.map((message) => (
                            <Message id={message.id} key={message.id} message={message} />
                        ))}
                    </Fragment>
                ))}

            {isFetchingNextPage ? Array.from({ length: 10 }, (_, i) => <MessageSkeleton key={i} />) : null}
        </Container>
    );
};

export default MessagesList;

