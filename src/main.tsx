import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './styles/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render((
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ChakraProvider theme={theme}>
                        <App />
                        <CSSReset />
                    </ChakraProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </React.StrictMode>
    ));
