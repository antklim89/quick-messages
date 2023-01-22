import supabase from '~/supabase/app';


export async function resetPasswordRequest({ email }: {email: string}) {

    const { error } = await supabase
        .auth
        .resetPasswordForEmail(email);

    if (error) {
        console.error(error.message);
        if (error) throw new Error('Failed to add favorite message. Try again later.');
    }
}
