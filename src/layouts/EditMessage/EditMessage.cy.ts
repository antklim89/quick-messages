import { faker } from '@faker-js/faker';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { auth, Collection, db } from '~/firebase/app';


describe('EditMessage', () => {
    const bodyInput = faker.lorem.words(20).slice(0, 200);
    const invalidBodyInput = 'X';

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

    it('should not create new message', () => {
        cy.getTestId('message-body-input').type(invalidBodyInput);
        cy.getTestId('submit-message-button').should('be.disabled');
    });

    it('should create new message', () => {
        cy.getTestId('message-body-input').clear().type(bodyInput);
        cy.getTestId('submit-message-button').click();
        cy.contains(/message successfully posted/i).should('exist');
        cy.getTestId('message-body-input').should('be.empty');


    });

    it('new message should be in database', async () => {
        const updatedSnap = await getDocs(query(collection(db, Collection.MESSAGES), where('body', '==', bodyInput)));
        expect(updatedSnap.docs).to.have.length(1);
    });

    it('invalid message should not be in database', async () => {
        const updatedSnap = await getDocs(query(collection(db, Collection.MESSAGES), where('body', '==', invalidBodyInput)));
        expect(updatedSnap.docs).to.have.length(0);
    });
});
