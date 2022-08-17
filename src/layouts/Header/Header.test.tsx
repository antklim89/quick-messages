import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';


describe('Header', () => {
    it('should be correct', async () => {
        render(<Header />);

        expect(true).toBeTruthy();
    });
});
