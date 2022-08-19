import {
    addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc,
} from 'firebase/firestore/lite';
import { db } from './app';
import { messageSchema } from '~/schemas';
import { IEditMessageInput, IMessage } from '~/types/message';
import { trhowTransformedError, transformFirebaseResponse } from '~/utils';


export async function createMessageRequest(authorId: string, body: IEditMessageInput) {
    try {
        await addDoc(collection(db, 'messages'), {
            ...body,
            createdAt: serverTimestamp(),
            author: authorId,
        });
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function updateMessageRequest(messageId: string, body: Partial<Pick<IMessage, 'body'>>) {
    try {
        await setDoc(doc(db, 'messages', messageId), body);
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function findMessagesRequest(): Promise<IMessage[]> {
    try {
        const q = query(collection(db, 'messages'));
        const messagesDocs = await getDocs(q);
        const messagesData = messagesDocs.docs.map(transformFirebaseResponse);

        const messages = await messageSchema.array().parseAsync(messagesData);

        return messages;
    } catch (error) {
        return trhowTransformedError(error);
    }
}

