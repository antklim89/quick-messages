import { Container } from '@chakra-ui/react';
import { last, times } from 'lodash';
import { FC, Fragment } from 'react';
import MyMessagesItem from './MyMessagesItem';
import { useEndScreenTrigger } from '~/hooks';
import { MESSAGES_LIMIT } from '~/requests';
import { useFindMessagesRequest, useUser } from '~/requests-hooks';


const MyMessages: FC = () => {
    const { getUserId } = useUser();
    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        data: { pages } = { pages: [] },
    } = useFindMessagesRequest({ authorId: getUserId() });

    useEndScreenTrigger(fetchNextPage, (!isFetching && (last(pages)?.length || 0) >= MESSAGES_LIMIT), 1000);

    return (
        <Container my={8} p={2}>
            {isLoading
                ? times(10, (i) => (
                    <div key={i}>message</div>
                ))
                : pages.map((messagePages) => (
                    <Fragment key={messagePages[0]?.id || 0}>
                        {messagePages.map((message) => (
                            <MyMessagesItem key={message.id} {...message} />
                        ))}
                    </Fragment>
                ))}
            {isFetchingNextPage
                ? times(10, (i) => (
                    <div key={i}>Loading...</div>
                ))
                : null}
        </Container>
    );
};

export default MyMessages;

