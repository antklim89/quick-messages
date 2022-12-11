import { faker } from '@faker-js/faker';
import supabase from '~/supabase/testApp';


describe('Auth', () => {
    const name = faker.internet.userName();
    const email = faker.internet.email(name);
    const password = 'qwer1234';

    const invalidEmail = 'INVALID';

    before(() => {
        cy.visit('/');
    });

    it('should register', () => {
        cy.visit('/register');
        cy.contains(/register/i).should('exist');
        cy.get('[name="name"]').clear().type(name);
        cy.get('[name="email"]').clear().type(invalidEmail);
        cy.get('[name="password"]').clear().type(password);
        cy.get('[name="confirm"]').clear().type(password);
        cy.get('[type="submit"]').should('be.disabled');

        cy.get('[name="email"]').clear().type(email);
        cy.get('[type="submit"]').click();

        cy.location('pathname').should('equal', '/');
        cy.contains(/logout/i).should('exist');
    });

    it('should logout', () => {
        cy.contains(/logout/i).click();
    });

    it('should not login with wrong password', () => {
        cy.visit('/login');

        cy.get('[name="email"]').clear().type(email);
        cy.get('[name="password"]').clear().type(`${password}INVALID`);

        cy.get('[type="submit"]').click();

        cy.contains(/Invalid login credentials/i);
    });

    it('should login', () => {
        cy.visit('/login');

        cy.get('[name="name"]').should('not.exist');
        cy.get('[name="email"]').clear().type(email);
        cy.get('[name="password"]').clear().type(password);
        cy.get('[name="confirm"]').should('not.exist');

        cy.get('[type="submit"]').click();

        cy.location('pathname').should('equal', '/');
        cy.contains(/logout/i).should('exist');
    });


    it('new user should be in database', async () => {
        const authResponse = await supabase.auth.signInWithPassword({ email, password });
        expect(authResponse.data?.user?.email).to.be.equal(email.toLocaleLowerCase());
        await supabase.auth.admin.deleteUser(authResponse.data?.user?.id || '');
    });
});
