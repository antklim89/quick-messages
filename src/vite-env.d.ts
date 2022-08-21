/// <reference types="vite/client" />
/// <reference types="cypress" />


export declare global {
    declare const IS_EMULATOR: boolean;
    declare const IS_DEV: boolean;

    export namespace Cypress {
        interface Chainable {
            getTestId(testId: string): Chainable<Element>
        }
    }
}

