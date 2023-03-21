import { createClient } from '@supabase/supabase-js';
import { Database } from './types-generated';
import { VITE_SUPABASE_KEY, VITE_SUPABASE_URL } from '~/constants';


export default createClient<Database>(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);
