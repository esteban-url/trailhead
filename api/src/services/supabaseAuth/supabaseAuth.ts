import { RedwoodGraphQLError } from '@redwoodjs/graphql-server'
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
    const { data: user, error } = await supabase.auth.api.createUser({
      email: input.email,
      password: input.password,
    })
    if (error) {
      throw new RedwoodGraphQLError(error.message)
    }
    return { uuid: user.id, email: user.email }
  } catch (error) {
    throw new RedwoodGraphQLError(error.message)
  }
}

export const signUpSupabaseUser = async ({ input }: CreateSupabaseUserArgs) => {
  try {
    const { data, error } = await supabase.auth.api.signUpWithEmail(
      input.email,
      input.password
    )

    if (error) {
      throw new RedwoodGraphQLError(error.message)
    }
    console.log({ data })

    if ('id' in data) {
      return { uuid: data.id, email: data.email }
    }
  } catch (error) {
    throw new RedwoodGraphQLError(error.message)
  }
}

export const resetPasswordForEmail = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
      console.error(error)
      throw new RedwoodGraphQLError(error.message)
    }
    return data
  } catch (error) {
    console.error(error)
    throw new RedwoodGraphQLError(error.message)
  }
}

export const sendMobileOTP = async ({ phone }: { phone: string }) => {
  try {
    const { data, error } = await supabase.auth.api.sendMobileOTP(phone)
    if (error) {
      console.error(error)
      throw new RedwoodGraphQLError(error.message)
    }
    return data
  } catch (error) {
    console.error(error)
    throw new RedwoodGraphQLError(error.message)
  }
}

export const inviteUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.api.inviteUserByEmail(email)

    if (error) {
      console.error(error)
      throw new RedwoodGraphQLError(error.message)
    }
    return data
  } catch (error) {
    console.error(error)
    throw new RedwoodGraphQLError(error.message)
  }
}

export const deleteSupabaseUser = async ({ uuid }: { uuid: string }) => {
  try {
    const { error } = await supabase.auth.api.deleteUser(
      uuid,
      process.env.SUPABASE_SERVICE_KEY
    )
    if (error && error.status !== 404) {
      console.error(error)
      throw new RedwoodGraphQLError(error.message)
    }
  } catch (error) {
    console.error(error)
    throw new RedwoodGraphQLError(error.message)
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
export const generateRecoveryLink = async (
  email: string,
  options?: OptionsArgs
) => {
  return generateLink('recovery', email, options)
}
export const generateInviteLink = async (
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
    const { data, error } = await supabase.auth.api.generateLink(
      type,
      email,
      options
    )
    if (error) {
      console.error(error)
      throw new RedwoodGraphQLError(error.message)
    }
    return data
  } catch (error) {
    console.error(error)
    throw new RedwoodGraphQLError(error.message)
  }
}
