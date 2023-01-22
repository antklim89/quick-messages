import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Protected from './components/Protected';
import ProfileInfo from './layouts/ProfileInfo';
import ResetPassword from './layouts/ResetPassword';
import MessagesList from '~/layouts/MessagesList';
import Profile from '~/layouts/Profile';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
                ],
            },
        ],
    },
]);
