

describe('<FTName>', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should be ok', () => {
        expect('true').to.match('true');
    });
});

export {};
