import { createClient } from '@supabase/supabase-js';
import { Database } from './types-generated';


const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || (() => {
    throw new Error('VITE_SUPABASE_URL env is required');
})();

const supabaseKey: string = import.meta.env.VITE_SUPABASE_SERVICE_ROLE || (() => {
    throw new Error('VITE_SUPABASE_SERVICE_ROLE env is required');
})();


const supabase = createClient<Database>(supabaseUrl, supabaseKey);


export default supabase;
