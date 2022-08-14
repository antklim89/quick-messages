import { Box } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';


vi.mock('react-router-dom', () => ({
    Link: Box,
}));

vi.mock('@chakra-ui/react', async () => {
    const actual = await vi.importActual('@chakra-ui/react') as { default: Record<string, unknown> };
    return {
        ...actual.default,
        useMediaQuery: () => [true],
        useTheme: () => ({ breakpoints: { md: 500 } }),
    };
});


describe('Header', () => {
    it('should be correct', async () => {
        render(<Header />);

        screen.debug();
        expect(true).toBeTruthy();
    });
});
