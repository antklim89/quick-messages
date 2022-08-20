import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';


export function transformFirebaseResponse(messageDoc: QueryDocumentSnapshot<DocumentData>): unknown {
    return {
        id: messageDoc.id,
        ...messageDoc.data(),
    };
}
