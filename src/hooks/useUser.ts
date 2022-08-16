import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '~/firebase/app';
import { IUser } from '~/types';


export function useUser() {
    const [user, setUser] = useState<IUser|null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { email, displayName, uid } = currentUser;
                setUser({
                    email,
                    name: displayName || 'anonim',
                    uid,
                });
            } else {
                setUser(null);
            }
        });
    }, []);

    return user;
}
