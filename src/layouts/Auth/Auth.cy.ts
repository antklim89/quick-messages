import { faker } from '@faker-js/faker';
import supabase from '~/supabase/testApp';


describe('Auth', () => {
    const name = faker.internet.userName();
    const email = faker.internet.email(name);
    const password = 'qwer1234';

    const invalidEmail = 'INVALID';

    beforeEach(() => {
        cy.visit('/');
    });

    it('should register', () => {
        cy.contains(/register/i).click();

        cy.get('[name="email"]').clear().type(invalidEmail);
        cy.get('[name="password"]').clear().type(password);
        cy.get('[name="confirm"]').clear().type(password);
        cy.contains(/submit/i).should('be.disabled');

        cy.get('[name="email"]').clear().type(email);
        cy.contains(/submit/i).click();

        cy.contains(/logout/i).should('exist');
        cy.contains(/logout/i).click();
    });


    it('should login', () => {
        cy.contains(/login/i).click();

        cy.get('[name="email"]').clear().type(email);
        cy.get('[name="password"]').clear().type(`${password}INVALID`);
        cy.contains(/submit/i).click();
        cy.contains(/Invalid login credentials/i);

        cy.get('[name="email"]').clear().type(email);
        cy.get('[name="password"]').clear().type(password);
        cy.get('[name="confirm"]').should('not.exist');

        cy.contains(/submit/i).click();
        cy.contains(/logout/i).should('exist');
    });


    it('new user should be in database', async () => {
        const authResponse = await supabase.auth.signInWithPassword({ email, password });
        expect(authResponse.data?.user?.email).to.be.equal(email.toLocaleLowerCase());
        await supabase.from('profiles').delete().eq('id', authResponse.data?.user?.id || '');
        await supabase.auth.admin.deleteUser(authResponse.data?.user?.id || '');
    });
});
