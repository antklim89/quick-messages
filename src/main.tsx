import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import theme from './styles/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 2 * 60 * 60 * 1000,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render((
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider resetCSS theme={theme}>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </QueryClientProvider>
        </React.StrictMode>
    ));
