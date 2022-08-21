import { faker } from '@faker-js/faker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase/app';


describe('<FTName>', () => {
    it('should be ok', () => {
        createUserWithEmailAndPassword(auth, faker.internet.email(), 'qwer123');
        cy.visit('/create-message');
    });
});
