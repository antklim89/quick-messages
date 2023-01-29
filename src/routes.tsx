import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';
import Protected from './components/Protected';
import MyMessages from './layouts/MyMessages';
import ProfileInfo from './layouts/ProfileInfo';
import ResetPassword from './layouts/ResetPassword';
import MessagesList from '~/layouts/MessagesList';
import Profile from '~/layouts/Profile';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                element: <MessagesList />,
                index: true,
            },
            {
                element: <MessagesList />,
                path: 'message/:messageId',
            },
            {
                element: <MessagesList />,
                path: 'user/:userId',
            },
            {
                element: <Protected><Profile /></Protected>,
                path: 'profile',
                children: [
                    {
                        index: true,
                        element: <Navigate replace to="info" />,
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
                ],
            },
        ],
    },
]);
