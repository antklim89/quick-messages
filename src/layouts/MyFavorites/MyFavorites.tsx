import { Box } from '@chakra-ui/react';
import last from 'lodash/last';
import times from 'lodash/times';
import { FC, Fragment } from 'react';
import MyFavoritesItem from './MyFavoritesItem';
import MyMessageSkeleton from '~/components/MyMessageSkeleton';
import { useEndScreenTrigger } from '~/hooks';
import { MESSAGES_LIMIT, useFindMyFavoritesRequest } from '~/requests-hooks';


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
        <Box my={8} p={2}>
            {isLoading
                ? times(10, (i) => (
                    <MyMessageSkeleton key={i} />
                ))
                : pages.map((messagePages) => (
                    <Fragment key={messagePages[0]?.id || 0}>
                        {messagePages.map((message) => (
                            <MyFavoritesItem key={message.id} {...message} />
                        ))}
                    </Fragment>
                ))}
            {isFetchingNextPage
                ? times(10, (i) => (
                    <MyMessageSkeleton key={i} />
                ))
                : null}
        </Box>
    );
};

export default MyFavorites;

