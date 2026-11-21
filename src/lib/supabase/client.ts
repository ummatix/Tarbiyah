import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const missingEnvVars: string[] = [];

if (!supabaseUrl) {
  missingEnvVars.push('VITE_SUPABASE_URL');
}

if (!supabasePublishableKey) {
  missingEnvVars.push('VITE_SUPABASE_PUBLISHABLE_KEY');
}

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required Supabase environment variable(s): ${missingEnvVars.join(', ')}. ` +
      'Please define them in .env.local and restart the development server.'
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

