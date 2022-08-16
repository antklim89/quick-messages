import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import { db } from './app';
import { IMessage } from '~/types/message';
import { trhowTransformedError } from '~/utils';


export async function createMessageRequest(body: Pick<IMessage, 'body'|'author'>) {
    try {
        await addDoc(collection(db, 'messages'), {
            ...body,
            createdAt: serverTimestamp(),
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
