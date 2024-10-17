import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://trngniqkajsrddfjliwc.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybmduaXFrYWpzcmRkZmpsaXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NDg1MDQsImV4cCI6MjA0NDUyNDUwNH0.dVYVkaK6U0c0Sk5XnsYNzLTc1NWLSdMF7w9TSY6hQV0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
