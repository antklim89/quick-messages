import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '~/firebase/app';
import { IUser } from '~/types';


export function useUser() {
    const [user, setUser] = useState<IUser|null>(null);

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            const { email, displayName } = currentUser;
            setUser({
                email,
                name: displayName || 'anonim',
            });
        } else {
            setUser(null);
        }
    });

    return user;
}
