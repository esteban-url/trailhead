import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export interface CreateSupabaseUserArgs {
  input: { email: string; password: string }
}

export const createSupabaseUser = async ({ input }: CreateSupabaseUserArgs) => {
  try {
    const { data: error } = await supabase.auth.api.createUser({
      email: input.email,
      password: input.password,
    })
    if (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

export const resetPasswordForEmail = async ({ email }: { email: string }) => {
  try {
    const { data: error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

export const sendMobileOTP = async ({ phone }: { phone: string }) => {
  try {
    const { data: error } = await supabase.auth.api.sendMobileOTP(phone)
    if (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

export const inviteUserByEmail = async ({ email }: { email: string }) => {
  try {
    const { data: error } = await supabase.auth.api.inviteUserByEmail(email)
    if (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteSupabaseUser = async ({ uuid }: { uuid: string }) => {
  try {
    const { data: error } = await supabase.auth.api.deleteUser(
      uuid,
      process.env.SUPABASE_SERVICE_KEY
    )
    if (error) {
      console.error(error)
    }
    return uuid
  } catch (error) {
    console.error(error)
  }
}

interface OptionsArgs {
  password?: string
  data?: object
  redirectTo?: string
}

export const generateSignupLink = async (
  email: string,
  options?: OptionsArgs
) => {
  return generateLink('signup', email, options)
}
export const generateMagicLink = async (
  email: string,
  options?: OptionsArgs
) => {
  return generateLink('magiclink', email, options)
}
export const generateRecoverylink = async (
  email: string,
  options?: OptionsArgs
) => {
  return generateLink('recovery', email, options)
}
export const generateInviteink = async (
  email: string,
  options?: OptionsArgs
) => {
  return generateLink('invite', email, options)
}

const generateLink = async (
  type: 'signup' | 'magiclink' | 'recovery' | 'invite',
  email: string,
  options?: OptionsArgs
) => {
  try {
    const { data: error } = await supabase.auth.api.generateLink(
      type,
      email,
      options
    )
    if (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}
