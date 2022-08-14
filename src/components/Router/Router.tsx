import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
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
} as const;

const Router: FC = () => {
    return (
        <Routes>
            {Object.values(routes).map(({ path, element }) => (
                <Route element={element} key={path} path={path} />
            ))}
        </Routes>
    );
};

export default Router;

