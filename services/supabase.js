import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cmtkivggburefjonicro.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdGtpdmdnYnVyZWZqb25pY3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwNjY1NzMsImV4cCI6MjAxODY0MjU3M30.-goFp1bp3cmuAKOBCJ34S3jmMXKuy9HNlJ85Ulk52Mw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
