import MessagesList from './layouts/MessagesList';
import Profile from './layouts/Profile';


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
    profile: {
        element: (
            <Profile />
        ),
        path: '/profile',
    },
} as const;
