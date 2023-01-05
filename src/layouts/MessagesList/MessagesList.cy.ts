import { faker } from '@faker-js/faker';


describe('MessagesList', () => {
    it('should not be new message button', () => {
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

        cy.getTestId('message-answer-button').first().click();
        cy.getTestId('message-list-add-new-message').click();
        cy.getTestId('message-body-input').first().type(newMessageBody);
        cy.getTestId('message').first().contains(newMessageBody);
    });

    it('should fetch more messages', () => {
        cy.visit('/');

        cy.getTestId('message').should('have.length', 10);
        cy.scrollTo('bottom', { easing: 'swing', duration: 100 });
        cy.getTestId('message').should('have.length', 20);

        cy.scrollTo('top', { easing: 'swing', duration: 100 });
        cy.getTestId('message-answer-button').first().click();
        cy.contains(/Quick Messages/i).click();
        cy.scrollTo('bottom', { easing: 'swing', duration: 100 });
    });
});

export {};
