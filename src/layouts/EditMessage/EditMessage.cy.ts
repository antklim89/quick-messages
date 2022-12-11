import { faker } from '@faker-js/faker';
import supabase from '~/supabase/app';
import { getUser } from '~/testSetup';


describe('EditMessage', () => {
    const MESSAGE_BODY = faker.lorem.sentence();

    beforeEach(() => {
        Cypress.supabase.auth.signOut();
        cy.visit('/create-message');
    });


    it('should be 404 page if not login', () => {
        cy.contains('404').should('exist');
        cy.contains('create message').should('not.exist');
    });

    it('should be "create message" input if login', () => {
        getUser();
        cy.contains('create message').click();
        cy.getTestId('message-body-input').should('exist');
    });

    it('should create new message', () => {
        cy.getTestId('message-body-input').type('%');
        cy.getTestId('submit-message-button').should('be.disabled');

        cy.getTestId('message-body-input').clear().type(MESSAGE_BODY);
        cy.getTestId('submit-message-button').click();
        cy.contains(/message successfully posted/i).should('exist');
        cy.getTestId('message-body-input').should('be.empty');
    });

    it('new message should be in database', async () => {
        const { data } = await supabase
            .from('messages')
            .select()
            .eq('body', MESSAGE_BODY);
        expect(data).to.have.length(1);
    });
});
