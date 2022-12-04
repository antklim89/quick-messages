import { messageSchema } from '~/schemas';
import { IEditMessageInput, IMessage } from '~/types/message';
import { trhowTransformedError } from '~/utils';


export async function createMessageRequest(body: IEditMessageInput) {
    try {
        // if (!auth.currentUser) throw new Error('You are not authenticated.');

        // await addDoc(collection(db, Collection.MESSAGES), {
        //     ...body,
        //     createdAt: serverTimestamp(),
        //     author: doc(db, `users/${auth.currentUser.uid}`),
        // });
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function updateMessageRequest(messageId: string, body: Partial<Pick<IMessage, 'body'>>) {
    try {
        // await setDoc(doc(db, Collection.MESSAGES, messageId), body);
    } catch (error) {
        trhowTransformedError(error);
    }
}

export async function findMessagesRequest(): Promise<IMessage[]> {
    try {

        return [];
    } catch (error) {
        return trhowTransformedError(error);
    }
}

