import { SupabaseClient } from "@supabase/supabase-js";
import { registerRequest } from "./supabase/authRequests";

export const user = {
    email: 'test1@mail.ru',
    password: 'qwer1234',
    name: 'anton'
};

export function getUser() {
    (Cypress.supabase as SupabaseClient).auth.signInWithPassword(user)
        .then(({error}) => {
            if (!error) return;
            registerRequest(user).catch(() => null);
            (Cypress.supabase as SupabaseClient).auth.signUp(user)
        })
    

    return user
}
