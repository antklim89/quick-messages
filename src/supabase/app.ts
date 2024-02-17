import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types-generated';
import { SUPABASE_KEY, SUPABASE_URL } from '~/constants';


let client: SupabaseClient<Database>;

export default async function createSupabaseClient() {
    const { createClient } = await import('@supabase/supabase-js');
    if (client) return client;
    client = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
    return client;
}
