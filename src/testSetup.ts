import supabase from "./supabase/app";


export const user = {
    email: 'test1@mail.ru',
    password: 'qwer1234',
    name: 'anton'
};

export async function getUser() {
    await supabase.auth.signInWithPassword(user)
        .then(({error}) => {
            if (!error) return;
            supabase.auth.signUp(user);
        })
    

    return user
}
