import { lazy, Suspense } from 'react';
import RouteLoading from './components/RouteLoading';


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
} as const;
