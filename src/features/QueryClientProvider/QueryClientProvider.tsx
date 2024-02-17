import { useToast } from '@chakra-ui/react';
import { QueryCache, QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';
import { ZodError } from 'zod';


const QueryClientProvider = ({ children }: { children: ReactNode }) => {
    const toast = useToast();

    const queryClient = useRef(new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 2 * 60 * 60 * 1000,
            },
        },
        queryCache: new QueryCache({
            onError(error) {
                console.error(error);
                const defaultErrMsg = 'Unexpected error. Try again later.';
                if (error instanceof ZodError) toast({ title: defaultErrMsg, status: 'error' });
                else toast({ title: error.message || defaultErrMsg, status: 'error' });
            },
        }),
    }));

    return (
        <TanstackQueryClientProvider client={queryClient.current}>
            {children}
        </TanstackQueryClientProvider>
    );
};

export default QueryClientProvider;
