/// <reference types="vite/client" />
/// <reference types="cypress" />

declare const IS_EMULATOR: boolean;
declare const IS_DEV: boolean;


export declare global {
    export namespace Cypress {
        interface Chainable {
            getTestId(testId: string): Chainable<Element>
        }
    }
}

