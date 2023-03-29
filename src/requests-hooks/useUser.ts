import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './constants';
import supabase from '~/supabase/app';


export function useUser() {
    const { data: { id, email } = {} } = useQuery<User | {id: null, email: null}>({
        queryKey: ['GET_USER'] satisfies QueryKey,
        async queryFn() {
            const { data, error } = await supabase.auth.getSession();
            if (error || !data.session?.user) return { id: null, email: null };

            return data.session.user;
        },
    });

    return {
        id,
        email,
        isAuth: Boolean(id),
        getUserId() {
            if (!id) throw new Error('You are not authenticated.');
            return id;
        },
    };
}
