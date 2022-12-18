import { Session } from '@supabase/supabase-js';
import { useMemo } from 'react';
import { IUser } from '~/types';


export function useUser() {
    const user: IUser| null = useMemo(() => {
        const storageSession = localStorage.getItem('sb-localhost-auth-token');
        if (!storageSession) return null;
        const session: Session = JSON.parse(storageSession);

        return { id: session.user.id, email: session.user.email };
    }, []);

    const isAuth = Boolean(user);

    return { user, isAuth };
}
