import { createClient } from "@supabase/supabase-js";

// Uses SERVICE ROLE key — never expose to browser
// Only import this file in server-side code (API routes, Server Actions)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
