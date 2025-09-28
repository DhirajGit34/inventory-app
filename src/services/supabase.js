import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vonifwsqjopmjcwyuyvw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbmlmd3Nxam9wbWpjd3l1eXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNDg4NTUsImV4cCI6MjA2MjgyNDg1NX0.Gx5wNh2UMarPlAEttPTq4zzUEdmJtuB2lh6i4x83KEA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
