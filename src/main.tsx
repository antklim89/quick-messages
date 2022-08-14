import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './styles/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render((
        <React.StrictMode>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <App />
                    <CSSReset />
                </ChakraProvider>
            </BrowserRouter>
        </React.StrictMode>
    ));
