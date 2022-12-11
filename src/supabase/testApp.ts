import { createClient } from '@supabase/supabase-js';


if (!Cypress) {
    throw new Error('Only for test.');
}

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || (() => {
    throw new Error('VITE_SUPABASE_URL env is required');
})();

const supabaseKey: string = import.meta.env.VITE_SUPABASE_SERVICE_ROLE || (() => {
    throw new Error('VITE_SUPABASE_SERVICE_ROLE env is required');
})();


const supabase = createClient(supabaseUrl, supabaseKey);

Cypress.supabase = supabase;

export default supabase;
