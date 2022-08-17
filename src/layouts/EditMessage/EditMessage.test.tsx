import { randomUUID } from 'crypto';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    addDoc, collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import { describe, it, vi } from 'vitest';
import EditMessage from './EditMessage';
import { db } from '~/firebase/app';
import * as messageRequests from '~/firebase/messageRequests';
import { IMessage } from '~/types/message';


vi.mock('~/hooks/useUser', () => ({
    useUser: () => ({
        user: { email: 't@t.com', uid: '1111' },
    }),
}));

const createMessageRequest = vi.spyOn(messageRequests, 'createMessageRequest');
const updateMessageRequest = vi.spyOn(messageRequests, 'updateMessageRequest');

describe('EditMessage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const bodyInput = () => screen.getByTestId('message-body-input');
    const submitButton = () => screen.getByTestId('submit-message-button');

    async function createNewMessage() {
        const data: IMessage = {
            body: randomUUID(), author: '2222', createdAt: new Date().toISOString(),
        };
        const newMessageSnap = await addDoc(collection(db, 'messages'), data);
        return { id: newMessageSnap.id, data };
    }

    it('should not send message if not correct input', async () => {
        render(<EditMessage />);

        await userEvent.type(bodyInput(), 'XX');
        await userEvent.click(submitButton());

        expect(createMessageRequest).not.toHaveBeenCalled();
        expect(submitButton()).toBeDisabled();
    });

    it('should send message if correct input', async () => {
        render(<EditMessage />);

        const messageBody = randomUUID();

        await userEvent.type(bodyInput(), messageBody);
        await userEvent.click(submitButton());

        expect(createMessageRequest).toBeCalledTimes(1);
        expect(updateMessageRequest).not.toBeCalled();

        await waitFor(async () => {
            const querySnapshot = await getDocs(query(collection(db, 'messages'), where('body', '==', messageBody)));

            expect(querySnapshot.docs).toHaveLength(1);
        });
    });


    it('should update message', async () => {
        const { id, data } = await createNewMessage();

        render(<EditMessage id={id} message={data} />);

        const updatedBody = randomUUID();

        await userEvent.clear(bodyInput());
        await userEvent.type(bodyInput(), updatedBody);
        await userEvent.click(submitButton());

        expect(updateMessageRequest).toBeCalledTimes(1);
        expect(createMessageRequest).not.toBeCalled();

        await waitFor(async () => {
            const updatedSnap = await getDocs(query(collection(db, 'messages'), where('body', '==', updatedBody)));
            expect(updatedSnap.docs).toHaveLength(1);
        });
    });

    it('body input should contain body from props', async () => {
        const { id, data } = await createNewMessage();

        render(<EditMessage id={id} message={data} />);

        expect(screen.getByText(data.body)).toBeInTheDocument();
    });
});

