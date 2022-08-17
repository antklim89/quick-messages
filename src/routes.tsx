import Protected from './components/Protected';
import CreateMessagePage from '~/pages/CreateMessagePage';
import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';


export const routes = {
    home: {
        element: <HomePage />,
        path: '/',
    },
    login: {
        element: <LoginPage />,
        path: '/login',
    },
    register: {
        element: <RegisterPage />,
        path: '/register',
    },
    createPost: {
        element: (
            <Protected><CreateMessagePage /></Protected>
        ),
        path: '/create-post',
    },
} as const;
