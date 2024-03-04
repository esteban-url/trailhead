import { useState } from 'react'

import type { WelcomeQuery, WelcomeQueryVariables } from 'types/graphql'

import { Form, TextField, Submit } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  useMutation,
} from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const LINK_USER_MUTATION = gql`
  mutation LinkUserMutation($input: LinkUserInput!) {
    linkUser(input: $input) {
      id
    }
  }
`
export const QUERY: TypedDocumentNode<
  WelcomeQuery,
  WelcomeQueryVariables
> = gql`
  query WelcomeQuery($id: String!) {
    user: userToLink(id: $id) {
      id
      email
      phone
      username
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<WelcomeQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
  id,
}: CellSuccessProps<WelcomeQuery, WelcomeQueryVariables> & {
  id: string
}) => {
  const { client } = useAuth()
  const [state, setState] = useState({
    error: null,
    loading: false,
    linking: false,
  })

  const [linkUser, { loading: linkLoading }] = useMutation(LINK_USER_MUTATION, {
    onCompleted: () => {
      setState((state) => ({ ...state, loading: false, linking: false }))
      window.location.replace('/dashboard')
    },
    onError: (error) => {
      console.error('Failed to link user', error)
      setState((state) => ({
        ...state,
        error: error.message,
        loading: false,
      }))
    },
  })

  const onVerify = async (data) => {
    setState((state) => ({
      ...state,
      error: null,
      loading: true,
    }))

    const response = user.email
      ? await client.auth.verifyOtp({
          email: user.email,
          token: data.code,
          type: 'email',
        })
      : await client.auth.verifyOtp({
          phone: user.phone,
          token: data.code,
          type: 'sms',
        })
    if (response.error) {
      console.error({ error: response.error })
      setState((state) => ({
        ...state,
        error: response.error.message,
        loading: false,
      }))
      return
    } else if (response.data) {
      //go to the home page to refresh the user
      linkUser({
        variables: {
          input: {
            id,
            email: user.email,
            phone: user.phone,
            createdAt: response.data.user.created_at,
            supaId: response.data.user.id,
          },
        },
      })
    }
  }

  return (
    <div>
      Welcome, {user.username}! Please verify your account by entering the code
      sent to your {user.email ? 'email' : 'phone'}.
      {linkLoading ? <div>Linking...</div> : null}
      <Form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={onVerify}
      >
        {state.error ? (
          <div
            className="relative mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{state.error}</span>
          </div>
        ) : null}
        <TextField
          className="mb-6 w-full  appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
          placeholder="Verification code"
          name="code"
          required
        />
        <div className="flex items-center justify-between">
          <Submit className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
            Verify
          </Submit>
        </div>
      </Form>
    </div>
  )
}
