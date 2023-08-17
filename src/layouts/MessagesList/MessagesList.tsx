import { Container } from '@chakra-ui/react';
import last from 'lodash/last';
import times from 'lodash/times';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import MessageListCreateNew from './MessagesListCreateNew';
import MessageSkeleton from '~/components/MessageSkeleton';
import { useEndScreenTrigger } from '~/hooks';
import Message from '~/layouts/Message/Message';
import MessageAuthor from '~/layouts/MessageAuthor';
import SubjectsList from '~/layouts/SubjectsList';
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

    useEndScreenTrigger(fetchNextPage, (!isFetching && (last(pages)?.length || 0) >= MESSAGES_LIMIT), 1000);

    return (
        <Container my={[4, 6]} p={[0, 2]}>
            {answerToId ? <Message isMain id={answerToId} /> : null}
            <SubjectsList />
            {authorId ? <MessageAuthor authorId={authorId} /> : <MessageListCreateNew isLoading={isLoading} /> }

            {isLoading
                ? times(10, (i) => <MessageSkeleton key={i} />)
                : pages.map((messagePages) => (
                    <Fragment key={messagePages[0]?.id || 0}>
                        {messagePages.map((message) => (
                            <Message id={message.id} key={message.id} message={message} />
                        ))}
                    </Fragment>
                ))}

            {isFetchingNextPage ? times(10, (i) => <MessageSkeleton key={i} />) : null}
        </Container>
    );
};

export default MessagesList;

