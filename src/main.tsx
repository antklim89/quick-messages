import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import theme from './styles/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';
import QueryClientProvider from '~/features/QueryClientProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render((
        <React.StrictMode>
            <QueryClientProvider>
                <ChakraProvider resetCSS theme={theme}>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </QueryClientProvider>
        </React.StrictMode>
    ));
