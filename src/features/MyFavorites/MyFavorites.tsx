import { Box } from '@chakra-ui/react';
import last from 'lodash/last';
import times from 'lodash/times';
import { FC, Fragment } from 'react';
import MessageSkeleton from '~/components/MessageSkeleton';
import Message from '~/features/Message';
import { useEndScreenTrigger } from '~/hooks';
import { MESSAGES_LIMIT, useFindMyFavoritesRequest } from '~/requests';


const MyFavorites: FC = () => {
    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        data: { pages } = { pages: [] },
    } = useFindMyFavoritesRequest();

    useEndScreenTrigger(fetchNextPage, (!isFetching && (last(pages)?.length || 0) >= MESSAGES_LIMIT), 1000);

    return (
        <Box>
            {isLoading
                ? times(10, (i) => (
                    <MessageSkeleton key={i} />
                ))
                : pages.map((messagePages) => (
                    <Fragment key={messagePages[0]?.id || 0}>
                        {messagePages.map((message) => (
                            <Message id={message.id} key={message.id} message={message} />
                        ))}
                    </Fragment>
                ))}
            {isFetchingNextPage
                ? times(10, (i) => (
                    <MessageSkeleton key={i} />
                ))
                : null}
        </Box>
    );
};

export default MyFavorites;

