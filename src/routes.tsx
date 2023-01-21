import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import ProfileInfo from './layouts/ProfileInfo';
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
                element: <Profile />,
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
                        path: 'change-email',
                        element: <div>CHANGE EMAIL</div>,
                    },
                ],
            },
        ],
    },
]);
