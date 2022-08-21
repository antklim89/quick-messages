/// <reference types="vite/client" />
/// <reference types="cypress" />


export declare global {
    import { mount } from 'cypress/react18';


    declare const IS_EMULATOR: boolean;
    declare const IS_DEV: boolean;

    export namespace Cypress {
        interface Chainable {
            getTestId(testId: string): Chainable<Element>
            mount: typeof mount
        }
    }
}

