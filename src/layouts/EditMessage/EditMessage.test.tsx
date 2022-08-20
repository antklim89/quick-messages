import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    addDoc, collection, doc, getDocs, query, serverTimestamp, where,
} from 'firebase/firestore/lite';
import { describe, it, vi } from 'vitest';
import EditMessage from './EditMessage';
import { auth, Collection, db } from '~/firebase/app';
import * as messageRequests from '~/firebase/messageRequests';
import { IEditMessageInput, IMessage } from '~/types';


const createMessageRequest = vi.spyOn(messageRequests, 'createMessageRequest');
const updateMessageRequest = vi.spyOn(messageRequests, 'updateMessageRequest');

describe('EditMessage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const bodyInput = () => screen.getByTestId('message-body-input');
    const submitButton = () => screen.getByTestId('submit-message-button');

    async function createNewMessage(): Promise<{id: string, message: IEditMessageInput}> {
        const { user } = await createUserWithEmailAndPassword(auth, faker.internet.email(), 'qwer1234');
        const data = {
            body: randomUUID(), author: doc(db, `users/${user.uid}`), createdAt: serverTimestamp(),
        };
        const newMessageSnap = await addDoc(collection(db, Collection.MESSAGES), data);
        return {
            id: newMessageSnap.id,
            message: { body: data.body },
        };
    }

    it('should not send message if not correct input', async () => {
        render(<EditMessage />);

        await userEvent.type(bodyInput(), 'XX');
        await userEvent.click(submitButton());

        expect(createMessageRequest).not.toHaveBeenCalled();
        expect(submitButton()).toBeDisabled();
    });

    it.only('should send message if correct input', async () => {
        render(<EditMessage />);

        const messageBody = randomUUID();

        await userEvent.type(bodyInput(), messageBody);
        await userEvent.click(submitButton());

        expect(createMessageRequest).toBeCalledTimes(1);
        expect(updateMessageRequest).not.toBeCalled();

        await waitFor(async () => {
            const querySnapshot = await getDocs(query(collection(db, Collection.MESSAGES), where('body', '==', messageBody)));

            expect(querySnapshot.docs).toHaveLength(1);
        });
    });


    it('should update message', async () => {
        const { id, message } = await createNewMessage();

        render(<EditMessage id={id} message={message} />);

        const updatedBody = randomUUID();

        await userEvent.clear(bodyInput());
        await userEvent.type(bodyInput(), updatedBody);
        await userEvent.click(submitButton());

        expect(updateMessageRequest).toBeCalledTimes(1);
        expect(createMessageRequest).not.toBeCalled();

        await waitFor(async () => {
            const updatedSnap = await getDocs(query(collection(db, Collection.MESSAGES), where('body', '==', updatedBody)));
            expect(updatedSnap.docs).toHaveLength(1);
        });
    });

    it('body input should contain body from props', async () => {
        const { id, message } = await createNewMessage();

        render(<EditMessage id={id} message={message} />);

        expect(screen.getByText(message.body)).toBeInTheDocument();
    });
});

