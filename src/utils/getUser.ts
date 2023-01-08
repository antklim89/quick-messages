import supabase from '~/supabase/app';


export async function getUser({ errorMessage }: { errorMessage?: string; } = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user.id) throw new Error(errorMessage || 'You are not authenticated');

    return session.user;
}
