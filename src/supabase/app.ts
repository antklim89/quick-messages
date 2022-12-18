import { createClient } from '@supabase/supabase-js';


const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || (() => {
    throw new Error('VITE_SUPABASE_URL env is required');
})();

const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY || (() => {
    throw new Error('VITE_SUPABASE_KEY env is required');
})();

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storageKey: 'sb-localhost-auth-token',
    },
});

export default supabase;
