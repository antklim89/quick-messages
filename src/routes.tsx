import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Protected from './components/Protected';
import RouterError from './components/RouterError';
import MyFavorites from './features/MyFavorites';
import MyMessages from './features/MyMessages';
import ProfileInfo from './features/ProfileInfo';
import ResetPassword from './features/ResetPassword';
import MessagesList from '~/features/MessagesList';
import Profile from '~/features/Profile';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <RouterError />,
        children: [
            {
                element: <MessagesList />,
                index: true,
            },
            {
                element: <MessagesList />,
                path: 'answer/:subject/:answerToId',
            },
            {
                element: <MessagesList />,
                path: 'user/:authorId',
            },
            {
                element: <MessagesList />,
                path: 'subject/:subject',
            },
            {
                element: <Protected><Profile /></Protected>,
                path: 'profile',
                children: [
                    {
                        index: true,
                        element: <Navigate replace to="/profile/info" />,
                    },
                    {
                        path: 'info',
                        element: <ProfileInfo />,
                    },
                    {
                        path: 'reset-password',
                        element: <ResetPassword />,
                    },
                    {
                        path: 'my-messages',
                        element: <MyMessages />,
                    },
                    {
                        path: 'my-favorites',
                        element: <MyFavorites />,
                    },
                ],
            },
        ],
    },
]);
