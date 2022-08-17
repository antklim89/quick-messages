import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '~/firebase/app';
import { IUser } from '~/types';


export function useUser() {
    const [user, setUser] = useState<IUser|null>(null);
    const [authInited, setAuthInited] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { email, displayName, uid, isAnonymous } = currentUser;
                setUser({
                    email,
                    name: displayName || 'Anonymous',
                    uid,
                    isAnonymous,
                });
                setIsAuth(true);
            } else {
                setUser(null);
                setIsAuth(false);
            }
            setAuthInited(true);
        });
    }, []);

    return { user, authInited, isAuth };
}
