import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://axospwxnuqfsswwkqdmp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b3Nwd3hudXFmc3N3d2txZG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE2NzEsImV4cCI6MjA3OTgzNzY3MX0.2jP6lYsDXhSmqbz9vtfztLVS9phxMqkan3bD4HtU5GA'  // put your anon key directly

export const supabase = createClient(supabaseUrl, supabaseKey)
