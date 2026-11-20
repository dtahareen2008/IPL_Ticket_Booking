import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exfpaiorbjdbvammizjb.supabase.co";

const supabaseKey = "sb_publishable_mZbI23r2lUzBujvsyVsNMg_Kh6CvOUS";
export const supabase = createClient(supabaseUrl, supabaseKey);