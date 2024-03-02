import type {
  CreateInviteCodeMutation,
  CreateInviteCodeInput,
  CreateInviteCodeMutationVariables,
} from 'types/graphql'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import InviteCodeForm from 'src/components/app/InviteCode/InviteCodeForm/InviteCodeForm'

const CREATE_INVITE_CODE_MUTATION: TypedDocumentNode<
  CreateInviteCodeMutation,
  CreateInviteCodeMutationVariables
> = gql`
  mutation CreateInviteCodeMutation($input: CreateInviteCodeInput!) {
    createInviteCode(input: $input) {
      id
    }
  }
`

const NewInviteCode = () => {
  const { currentUser } = useAuth()
  const { tenantSlug } = useParams()
  const [createInviteCode, { loading, error }] = useMutation(
    CREATE_INVITE_CODE_MUTATION,
    {
      onCompleted: () => {
        toast.success('InviteCode created')
        navigate(routes.inviteCodes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateInviteCodeInput) => {
    console.log({ currentUser })

    createInviteCode({
      variables: {
        input: {
          tenantSlug: tenantSlug || 'a',
        },
      },
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New InviteCode</h2>
      </header>
      <div className="rw-segment-main">
        <InviteCodeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInviteCode
