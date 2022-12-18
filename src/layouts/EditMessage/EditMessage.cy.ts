import { faker } from '@faker-js/faker';
import supabase from '~/supabase/app';
import { getUser } from '~/testSetup';


describe('EditMessage', () => {
    const MESSAGE_BODY = faker.lorem.sentence();

    it('should be 404 page if not login', () => {
        cy.visit('/create-message');
        cy.contains('404');
        cy.contains('create message').should('not.exist');
    });

    it('should create new message', () => {
        getUser();
        cy.visit('/create-message');
        cy.contains('create message').should('exist');
        cy.getTestId('message-body-input').should('exist');

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
