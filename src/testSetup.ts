import { beforeEach, vi } from 'vitest';
import fetch from 'node-fetch';
import { Box } from '@chakra-ui/react';


vi.mock('@chakra-ui/react', async () => {
    const actual = await vi.importActual('@chakra-ui/react') as { default: Record<string, unknown> };
    return {
        ...actual.default,
        useMediaQuery: () => [true],
        useTheme: () => ({ breakpoints: { md: 500 } }),
    };
});

vi.mock('react-router-dom', () => ({
    Link: Box,
}));


beforeEach(async () => {
    vi.clearAllMocks();
    await fetch('http://localhost:8080/emulator/v1/projects/quick-messages-56476/databases/(default)/documents', { method: 'DELETE' });
    await fetch('http://localhost:9099/emulator/v1/projects/quick-messages-56476/accounts', { method: 'DELETE' });
});


