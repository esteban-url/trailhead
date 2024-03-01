import { createClient } from '@supabase/supabase-js'

import { createUser } from '../users/users'

const supabase_url = process.env.SUPABASE_URL
// const anon_key = process.env.SUPABASE_ANON_KEY
const supabase_key = process.env.SUPABASE_KEY
const supabase = createClient(supabase_url, supabase_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
})

export const signUp = async ({ input }) => {
  const { type, identifier, name, code } = input
  let obj: { email: string } | { phone: string }
  console.log('signUp', type, identifier)

  if (type === 'email') {
    obj = { email: identifier }
  } else {
    obj = { phone: identifier }
  }
  const { data, error } = await supabase.auth.signInWithOtp(obj)

  if (error) {
    console.log('error', error)
    return error
  }

  console.log('data', data)

  const { user } = data
  const rrr = await createUser({
    input: { id: user.id, name, code, username: name, ...obj },
  })
  console.log(data, error, rrr)
  return data.user
}
