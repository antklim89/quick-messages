/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable {
        login(): Chainable<Element>
        getTestId: (testId: string) => Chainable<JQuery<HTMLElement>>
    }
}
