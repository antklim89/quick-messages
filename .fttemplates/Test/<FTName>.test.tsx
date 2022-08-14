import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import <FTName> from './<FTName>';


describe('<FTName>', () => {
    it('should be correct', async () => {
        render(<<FTName> />);

        screen.debug();
        expect(true).toBeTruthy();
    });
});
