import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';
import fetch from 'node-fetch';
import { Box } from '@chakra-ui/react';


vi.mock('@chakra-ui/react', async () => {
    const actual = await vi.importActual('@chakra-ui/react') as { default: Record<string, unknown> };
    return {
        ...actual.default,
        useMediaQuery: () => [true],
        useTheme: () => ({ breakpoints: { md: 500 } }),
        useToast: () => vi.fn()
    };
});

vi.mock('react-router-dom', () => ({
    Link: Box,
    useNavigate: () => () => {}
}));


beforeEach(async () => {
    vi.clearAllMocks();
});
