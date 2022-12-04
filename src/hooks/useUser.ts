import { useEffect, useState } from 'react';
import supabase from '~/supabase/app';
import { IUser } from '~/types';


export function useUser() {
    const [user, setUser] = useState<IUser|null>(null);
    const [authInited, setAuthInited] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) return;
            const { email, id, user_metadata: { name } } = data.user;
            setUser({
                email: email || '',
                name: name || 'Anonymous',
                id,
            });
        });
    }, []);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
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
            setAuthInited(true);
        });
    }, []);

    return { user, authInited, isAuth };
}
