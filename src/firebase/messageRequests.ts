import {
    addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc,
} from 'firebase/firestore/lite';
import { auth, Collection, db } from './app';
import { messageSchema } from '~/schemas';
import { IEditMessageInput, IMessage } from '~/types/message';
import { trhowTransformedError, transformFirebaseResponse } from '~/utils';


export async function createMessageRequest(body: IEditMessageInput) {
    try {
        if (!auth.currentUser) throw new Error('You are not authenticated.');

        await addDoc(collection(db, Collection.MESSAGES), {
            ...body,
            createdAt: serverTimestamp(),
            author: doc(db, `users/${auth.currentUser.uid}`),
        });
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function updateMessageRequest(messageId: string, body: Partial<Pick<IMessage, 'body'>>) {
    try {
        await setDoc(doc(db, Collection.MESSAGES, messageId), body);
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function findMessagesRequest(): Promise<IMessage[]> {
    try {
        const q = query(collection(db, Collection.MESSAGES));
        const messagesDocs = await getDocs(q);
        const messagesData = messagesDocs.docs.map(transformFirebaseResponse);

        const messages = await messageSchema.array().parseAsync(messagesData);

        return messages;
    } catch (error) {
        return trhowTransformedError(error);
    }
}

