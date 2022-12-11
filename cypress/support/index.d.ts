

declare namespace Cypress {
    import { SupabaseClient } from '@supabase/supabase-js';


    interface Cypress {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        supabase: SupabaseClient<any, 'public', any>
    }
}
