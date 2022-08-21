import { faker } from '@faker-js/faker';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '~/firebase/app';


describe('Auth', () => {
    const name = faker.internet.userName();
    const email = faker.internet.email(name);
    const password = 'qwer1234';

    const insvalidEmail = 'INVALID';

    it('should be render register page', () => {
        signOut(auth);
        cy.visit('/register');
        cy.contains(/register/i).should('exist');
    });

    it('should register', () => {
        cy.get('[name="name"]').type(name);
        cy.get('[name="email"]').type(insvalidEmail);
        cy.get('[name="password"]').type(password);
        cy.get('[name="confirm"]').type(password);
        cy.get('[type="submit"]').should('be.disabled');

        cy.get('[name="email"]').clear().type(email);
        cy.get('[type="submit"]').click();

        cy.location('pathname').should('equal', '/');
        cy.contains(/logout/i).should('exist');
    });

    it('should logout', () => {
        cy.contains(/logout/i).click();
    });

    it('should login', () => {
        cy.visit('/login');

        cy.get('[name="name"]').should('not.exist');
        cy.get('[name="email"]').type(email);
        cy.get('[name="password"]').type(password);
        cy.get('[name="confirm"]').should('not.exist');

        cy.get('[type="submit"]').click();

        cy.location('pathname').should('equal', '/');
        cy.contains(/logout/i).should('exist');
    });


    it('new user should be in database', async () => {
        const updatedSnap = await signInWithEmailAndPassword(auth, email, password);
        expect(updatedSnap.user.email).to.be.equal(email.toLocaleLowerCase());
    });
});
