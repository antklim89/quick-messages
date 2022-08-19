import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import set from 'lodash/set';


export function transformFirebaseResponse(messageDoc: QueryDocumentSnapshot<DocumentData>): unknown {
    const result = {
        id: messageDoc.id,
        ...messageDoc.data(),
    };

    forEach(result, (value: unknown, key) => {
        if (has(value, 'seconds')) set(result, key, new Date((value as { seconds: number; }).seconds * 1000).toLocaleString());
    });

    return result;
}
