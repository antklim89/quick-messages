import MessagesList from './layouts/MessagesList';


export const routes = {
    home: {
        element: (
            <MessagesList />
        ),
        path: '/',
    },
    message: {
        element: (
            <MessagesList />
        ),
        path: '/message/:messageId',
    },
} as const;
