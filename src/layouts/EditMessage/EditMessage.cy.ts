import { faker } from '@faker-js/faker';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '~/firebase/app';


describe('EditMessage', () => {
    before(() => {
        signOut(auth);
        cy.visit('/create-message');
    });

    it('should be 404 page if not login', () => {
        cy.contains('404').should('exist');
        cy.contains('create message').should('not.exist');
    });

    it('should be "create message" input if login', () => {
        createUserWithEmailAndPassword(auth, faker.internet.email(), 'qwer123');
        cy.getTestId('message-body-input').should('exist');
    });

    it('should create new message', () => {
        cy.getTestId('message-body-input').type('X');
        cy.getTestId('submit-message-button').should('be.disabled');
    });

    it('should create new message', () => {
        cy.getTestId('message-body-input').type('Lorem ipsum');
        cy.getTestId('submit-message-button').click();
        cy.contains(/message successfully posted/i).should('exist');
        cy.getTestId('message-body-input').should('be.empty');
    });
});
