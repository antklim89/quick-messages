import { faker } from '@faker-js/faker';


describe('MessagesList', () => {
    it('should not be new mmessage button', () => {
        cy.visit('/');
        cy.getTestId('message-list-add-new-message').should('not.exist');
    });

    it('should add new message', () => {
        const newMessageBody = faker.lorem.paragraph();
        cy.login();
        cy.visit('/');

        cy.getTestId('message').should('have.length', 10);
        cy.getTestId('message-list-add-new-message').click();
        cy.getTestId('submit-message-button').first().should('be.disabled');
        cy.getTestId('message-body-input').first().type('L');
        cy.getTestId('message-body-input').first().clear();
        cy.getTestId('message-body-input').first().type(newMessageBody);
        cy.getTestId('submit-message-button').first().click();

        cy.getTestId('message').first().contains(newMessageBody);
        cy.getTestId('message').should('have.length', 11);
    });

    it('should fetch more messages', () => {
        cy.visit('/');

        cy.getTestId('message').should('have.length', 10);
        cy.scrollTo('bottom');
        cy.getTestId('message').should('have.length', 20);
    });
});

export {};
