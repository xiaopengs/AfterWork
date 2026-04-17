import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client with service role permissions
 * 
 * WARNING: This client bypasses Row Level Security (RLS) policies!
 * Only use this in server-side code (API routes, server components, etc.)
 * NEVER expose this client or its credentials to the client-side.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create client with service_role key for server-side operations
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

/**
 * Example usage in API routes:
 * 
 * import { supabaseServer } from '@/lib/supabase-server'
 * 
 * export async function GET(request: Request) {
 *   // Service role client bypasses RLS - use carefully!
 *   const { data, error } = await supabaseServer
 *     .from('posts')
 *     .select('*')
 *   
 *   if (error) return Response.json({ error: error.message }, { status: 500 })
 *   return Response.json(data)
 * }
 */
