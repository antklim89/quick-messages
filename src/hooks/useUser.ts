import { Session } from '@supabase/supabase-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import supabase from '~/supabase/app';
import { IUser } from '~/types';


export function useUser() {
    const [user, setUser] = useState<IUser|null>(null);
    const [authInited, setAuthInited] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then((({ data: { session } }) => {
            authenticate(session, setUser, setIsAuth);
            setAuthInited(true);
        }));
    }, []);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            authenticate(session, setUser, setIsAuth);
        });
    }, []);

    return { user, authInited, isAuth };
}


function authenticate(
    session: Session | null,
    setUser: Dispatch<SetStateAction<IUser | null>>,
    setIsAuth: Dispatch<SetStateAction<boolean>>,
) {
    if (session && session?.user) {
        const { email, id, user_metadata: { name } } = session.user;
        setUser({
            email: email || '',
            name: name || 'Anonymous',
            id,
        });
        setIsAuth(true);
    } else {
        setUser(null);
        setIsAuth(false);
    }
}

