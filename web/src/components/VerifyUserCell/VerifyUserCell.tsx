import { useEffect, useState } from 'react'

import type { CreateUserInput, EditUserById } from 'types/graphql'

import { Form, Submit, TextField } from '@redwoodjs/forms'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { CREATE_USER_MUTATION as CREATE_MUTATION } from 'src/components/app/User/NewUser/NewUser'
import { QUERY as GET_QUERY } from 'src/components/app/User/UserCell/UserCell'

export const QUERY = GET_QUERY
export const CREATE_USER_MUTATION = CREATE_MUTATION
export const Loading = () => <div>Loading...</div>

export const Empty = ({ id }) => {
  const { client, currentUser } = useAuth()
  const [cu, setCu] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      const c = await client?.auth?.getUser()
      setCu(c)
    }
    getUser()
    return () => {}
  }, [client])

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      // toast.success('User created')
      //  navigate(routes.users({ tenantSlug }))
    },
    onError: (error) => {
      console.error('error', error.message)

      //  toast.error(error.message)
    },
  })
  const onSubmit = (input: CreateUserInput) => {
    createUser({ variables: { input: { ...input, id } } })
  }
  return (
    <div>
      Thank you for verifying your identify, we just need a couple more things:
      {id}
      <Form onSubmit={onSubmit}>
        <TextField name="name" placeholder="Name" />
        <TextField name="username" placeholder="Username" />
        <Submit>Save</Submit>
      </Form>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<EditUserById>) => {
  return (
    <div>
      <h1>Welcome name: {user.name}</h1>
      <p>id: {user.id}</p>
      <p>email: {user.email}</p>
      <p>phone: {user.phone}</p>
      <p>username: {user.username}</p>
      <p>name: {user.name}</p>
    </div>
  )
}
