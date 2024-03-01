import type {
  CreateUserMutation,
  CreateUserInput,
  CreateUserMutationVariables,
} from 'types/graphql'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserForm from 'src/components/app/User/UserForm/UserForm'

export const CREATE_USER_MUTATION: TypedDocumentNode<
  CreateUserMutation,
  CreateUserMutationVariables
> = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const NewUser = () => {
  const { tenantSlug } = useParams()
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created')
      navigate(routes.users({ tenantSlug }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateUserInput) => {
    createUser({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New User</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUser
