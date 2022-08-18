import { lazy, Suspense } from 'react';
import Protected from './components/Protected';
import RouteLoading from './components/RouteLoading';


const CreateMessagePage = lazy(() => import('~/pages/CreateMessagePage'));
const HomePage = lazy(() => import('~/pages/HomePage'));
const LoginPage = lazy(() => import('~/pages/LoginPage'));
const RegisterPage = lazy(() => import('~/pages/RegisterPage'));


export const routes = {
    home: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <HomePage />
            </Suspense>
        ),
        path: '/',
    },
    login: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <Protected protectIfAuth><LoginPage /></Protected>
            </Suspense>
        ),
        path: '/login',
    },
    register: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <Protected protectIfAuth>
                    <RegisterPage />
                </Protected>
            </Suspense>
        ),
        path: '/register',
    },
    createPost: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <Protected>
                    <CreateMessagePage />
                </Protected>
            </Suspense>
        ),
        path: '/create-post',
    },
} as const;
