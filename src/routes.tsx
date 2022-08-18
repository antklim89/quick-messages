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
        element: <Protected protectIfAuth><LoginPage /></Protected>,
        path: '/login',
    },
    register: {
        element: <Protected protectIfAuth><RegisterPage /></Protected>,
        path: '/register',
    },
    createPost: {
        element: (
            <Protected><CreateMessagePage /></Protected>
        ),
        path: '/create-post',
    },
} as const;
