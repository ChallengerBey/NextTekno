
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wkntrqpybkgmqmrcexyj.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_3ug7bH2XN8ZwtGtx_dcvmw_N_iB2QlY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
