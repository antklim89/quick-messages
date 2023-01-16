import { User } from '@supabase/supabase-js';
import supabase from '~/supabase/app';


export function getUser(args?: { errorMessage?: string; required?: true }): Promise<User>

export function getUser(args?: { errorMessage?: string; required: false }): Promise<null | User>

export async function getUser({ required = true, errorMessage }: { errorMessage?: string; required?: boolean } = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user.id) {
        if (required) throw new Error(errorMessage || 'You are not authenticated');
        else return null;
    }

    return session.user;
}
