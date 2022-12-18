import { SupabaseClient } from "@supabase/supabase-js";


export const user = {
    email: 'test1@mail.ru',
    password: 'qwer1234',
    name: 'anton'
};

export function getUser() {
    (Cypress.supabase as SupabaseClient).auth.signInWithPassword(user)
        .then(({error}) => {
            if (!error) return;
            (Cypress.supabase as SupabaseClient).auth.signUp(user);
        })
    

    return user
}
