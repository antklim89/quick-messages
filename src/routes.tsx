import { lazy, Suspense } from 'react';
import Protected from './components/Protected';
import RouteLoading from './components/RouteLoading';


const CreateMessagePage = lazy(() => import('~/pages/CreateMessagePage'));
const HomePage = lazy(() => import('~/pages/HomePage'));


export const routes = {
    home: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <HomePage />
            </Suspense>
        ),
        path: '/',
    },
    createMessage: {
        element: (
            <Suspense fallback={<RouteLoading />}>
                <Protected>
                    <CreateMessagePage />
                </Protected>
            </Suspense>
        ),
        path: '/create-message',
    },
} as const;
