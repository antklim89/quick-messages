/// <reference types="cypress" />


// @ts-expect-error type error
Cypress.Commands.add('getTestId', (testId: string) => {
    return cy.get(`[data-cy="${testId}"]`);
});
