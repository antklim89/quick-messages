

describe('Header', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should not be render drawer-toggler if big viewport', () => {
        cy.getTestId('drawer-toggler').should('not.exist');
    });

    it('should be render drawer-toggler if small viewport', () => {
        cy.viewport('samsung-s10');
        cy.getTestId('drawer-toggler').click();
        cy.wait(700);
        cy.get('.chakra-modal__close-btn').click({ force: true });
    });
});

export {};
