import { createClient } from '@supabase/supabase-js';
import { Database } from './types-generated';
import { SUPABASE_KEY, SUPABASE_URL } from '~/constants';


export default createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
