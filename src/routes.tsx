import { lazy, Suspense } from 'react';
import RouteLoading from './components/RouteLoading';


const HomePage = lazy(() => import('~/pages/HomePage'));
const MessagePage = lazy(() => import('~/pages/MessagePage'));


export const routes = {
    home: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <HomePage />
            </Suspense>
        ),
        path: '/',
    },
    message: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <MessagePage />
            </Suspense>
        ),
        path: '/message/:messageId',
    },
} as const;
