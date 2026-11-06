import { createClient } from '@supabase/supabase-js';

const url=import.meta.env.VITE_SUPABASE_URL?.trim();
const key=import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

let client: ReturnType<typeof createClient> | null=null;
let configured=false;

if(url && key && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)){
  try {
    client=createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    configured=true;
  } catch(error) {
    console.error('Supabase client initialization failed:',error);
  }
} else {
  console.warn('Supabase configuration is missing or the project URL is invalid. Running in preview mode.');
}

export const isSupabaseConfigured=configured;
export const supabase=client;
