import { useQuery } from '@tanstack/react-query';
import { QueryName } from './constants';
import supabase from '~/supabase/app';



export function useUser() {
    const { data: userId } = useQuery<string | null, Error>({
        queryKey: [QueryName.GET_USER],
        async queryFn() {
            const { data, error } = await supabase.auth.getSession();
            if (error)
                return null;
            if (!data.session?.user)
                return null;

            const { id } = data.session.user;

            return id;
        },
        onSuccess(id) {
            if (id)
                localStorage.setItem(QueryName.GET_USER, id);
        },
        placeholderData: () => localStorage.getItem(QueryName.GET_USER),
    });

    return {
        id: userId,
        isAuth: Boolean(userId),
        getUserId() {
            if (!userId)
                throw new Error('No user logged in.');
            return userId;
        },
    };
}
