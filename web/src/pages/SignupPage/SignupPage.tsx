import { useState } from 'react'

import { useApolloClient } from '@apollo/client'
import type {
  ValidateCodeInput,
  ValidateCodeInputVariables,
  ValidateEmailInput,
  ValidateEmailInputVariables,
  ValidatePhoneInput,
  ValidatePhoneInputVariables,
  ValidateUsernameInput,
  ValidateUsernameInputVariables,
} from 'types/graphql'

import { FieldError, Form, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata, TypedDocumentNode, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

export const QUERY_CODE: TypedDocumentNode<
  ValidateCodeInput,
  ValidateCodeInputVariables
> = gql`
  query ValidateCode($code: String!) {
    isValidInviteCode: isValidInviteCode(id: $code)
  }
`
export const QUERY_EMAIL: TypedDocumentNode<
  ValidateEmailInput,
  ValidateEmailInputVariables
> = gql`
  query ValidateEmail($email: String!) {
    isEmailUnique: isEmailUnique(email: $email)
  }
`
export const QUERY_PHONE: TypedDocumentNode<
  ValidatePhoneInput,
  ValidatePhoneInputVariables
> = gql`
  query ValidatePhone($phone: String!) {
    isPhoneUnique: isPhoneUnique(phone: $phone)
  }
`
export const QUERY_USERNAME: TypedDocumentNode<
  ValidateUsernameInput,
  ValidateUsernameInputVariables
> = gql`
  query ValidateUsername($username: String!) {
    isUsernameUnique: isUsernameUnique(username: $username)
  }
`

export const SIGNUP_USER_MUTATION = gql`
  mutation SignUpUserMutation(
    $inviteCode: String!
    $phone: String
    $email: String
    $name: String!
    $username: String!
  ) {
    signUpUser(
      input: {
        inviteCode: $inviteCode
        email: $email
        phone: $phone
        name: $name
        username: $username
      }
    ) {
      id
    }
  }
`

const SignupPage = ({ code }) => {
  const { logIn } = useAuth()
  const [state, setState] = useState(() => ({
    code: code,
    loading: false,
  }))

  const [signUpUser, { loading, error }] = useMutation(SIGNUP_USER_MUTATION, {
    onCompleted: (eee) => {
      return eee
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const apolloClient = useApolloClient()

  const validateUsername = async (username) => {
    const {
      data: { isUsernameUnique },
      // loading,
      // error,
    } = await apolloClient.query({
      query: QUERY_USERNAME,
      variables: {
        username,
      },
    })
    return isUsernameUnique ? true : 'Username already in use'
  }
  const validateIdentifier = async (identifier) => {
    if (identifier.includes('@')) {
      const {
        data: { isEmailUnique },
        // loading,
        // error,
      } = await apolloClient.query({
        query: QUERY_EMAIL,
        variables: {
          email: identifier,
        },
      })
      return isEmailUnique ? true : 'Email already in use'
    } else {
      const {
        data: { isPhoneUnique },
        // loading,
        // error,
      } = await apolloClient.query({
        query: QUERY_PHONE,

        variables: {
          phone: identifier,
        },
      })
      return isPhoneUnique ? true : 'Phone number already in use'
    }
  }
  const validateCode = async (code) => {
    const {
      data: { isValidInviteCode },
      // loading,
      // error,
    } = await apolloClient.query({
      query: QUERY_CODE,
      variables: {
        code,
      },
    })

    return isValidInviteCode ? true : 'Invalid invite code'
  }

  const onSignUp = async (data: {
    code: string
    identifier: string
    name: string
    username: string
  }) => {
    const signUpType = data.identifier.includes('@') ? 'email' : 'phone'
    setState((state) => ({
      ...state,
      loading: true,
    }))

    if (signUpType === 'email') {
      await logIn({
        authMethod: 'otp',
        email: data.identifier,
      })
    } else {
      await logIn({
        authMethod: 'otp',
        phone: data.identifier,
      })
    }
    const {
      data: {
        signUpUser: { id },
      },
    } = await signUpUser({
      variables: {
        inviteCode: state.code || data?.code || '',
        email: signUpType === 'email' ? data.identifier : null,
        phone: signUpType === 'phone' ? data.identifier : null,
        name: data.name,
        username: data.username,
      },
    })

    navigate(routes.welcome({ id }))
    setState((state) => ({
      ...state,
      loading: false,
    }))
  }
  if (state.loading) return <div>Loading...</div>
  return (
    <>
      <Metadata title="Signup" description="Signup page" />
      <div className="mx-auto w-full max-w-xs">
        <h1 className="text-3xl font-bold">Welcome to Trailhead!</h1>
        <p className="mb-4">
          Sign up to get started with your new account or sign in to start using
          our services.
        </p>
        <Form
          className="rounded bg-white px-8 pb-8 pt-6 shadow-md"
          onSubmit={onSignUp}
        >
          {/* {state.errors.code ? (
            <div className="flex items-center">
              <div className=" text-red-500 text-sm">
                {code
                  ? `If you received an invite code, please request a new one.`
                  : ''}
              </div>
            </div>
          ) : null} */}
          {!state.code ? (
            <>
              <TextField
                className="mb-6 w-full appearance-none rounded border  px-3 py-2 leading-tight text-gray-700 shadow"
                placeholder="Invite code"
                errorClassName="w-full appearance-none rounded border-2 px-3 py-2 leading-tight text-red-700 border-red-500 shadow"
                name="code"
                validation={{
                  validate: (code) => validateCode(code),

                  required: { value: true, message: 'Invite code is required' },
                }}
                required
              />
              <FieldError name="code" className=" text-sm text-red-500" />
            </>
          ) : null}
          <TextField
            className="mb-6 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
            placeholder="Phone Number or email"
            name="identifier"
            errorClassName="w-full appearance-none rounded border-2 px-3 py-2 leading-tight text-red-700 border-red-500 shadow"
            validation={{
              validate: (identifier) => validateIdentifier(identifier),
              required: {
                value: true,
                message: 'Email or phone number is required',
              },
            }}
          />
          <FieldError name="identifier" className=" text-sm text-red-500" />
          <TextField
            className="mb-6 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
            placeholder="username"
            name="username"
            errorClassName="w-full appearance-none rounded border-2 px-3 py-2 leading-tight text-red-700 border-red-500 shadow"
            validation={{
              validate: (username) => validateUsername(username),
              minLength: 2,
              maxLength: 57,
              required: { value: true, message: 'Username is required' },
            }}
          />
          <FieldError name="username" className=" text-sm text-red-500" />
          <TextField
            className="mb-6 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
            placeholder="Full Name"
            errorClassName="w-full appearance-none rounded border-2 px-3 py-2 leading-tight text-red-700 border-red-500 shadow"
            name="name"
            validation={{
              required: { value: true, message: 'Name is required' },
            }}
          />
          <FieldError name="name" className=" text-sm text-red-500" />
          <div className="flex items-center justify-between">
            <Submit className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
              Sign up
            </Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

export default SignupPage
