import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import EditMessage from './EditMessage';


describe('EditMessage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should be correct login validation', async () => {
        render(<EditMessage />);
    });
});
