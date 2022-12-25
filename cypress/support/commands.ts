/// <reference types="cypress" />
import supabase from '~/supabase/app';
import { user } from '~/testData';


Cypress.Commands.add('getTestId', (testId) => {
    return cy.get(`[data-cy="${testId}"]`);
});

Cypress.Commands.add('login', () => {
    supabase.auth.signInWithPassword(user)
        .then(({ error }) => {
            if (!error) return;
            supabase.auth.signUp(user);
        });
});

export {};
