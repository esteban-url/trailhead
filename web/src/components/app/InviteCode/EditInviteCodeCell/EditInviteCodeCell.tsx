import type {
  EditInviteCodeById,
  UpdateInviteCodeInput,
  UpdateInviteCodeMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InviteCodeForm from 'src/components/app/InviteCode/InviteCodeForm/InviteCodeForm'

export const QUERY: TypedDocumentNode<EditInviteCodeById> = gql`
  query EditInviteCodeById($id: String!) {
    inviteCode: inviteCode(id: $id) {
      id
      tenantId
      userId
      createdAt
      updatedAt
    }
  }
`

const UPDATE_INVITE_CODE_MUTATION: TypedDocumentNode<
  EditInviteCodeById,
  UpdateInviteCodeMutationVariables
> = gql`
  mutation UpdateInviteCodeMutation(
    $id: String!
    $input: UpdateInviteCodeInput!
  ) {
    updateInviteCode(id: $id, input: $input) {
      id
      tenantId
      userId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  inviteCode,
}: CellSuccessProps<EditInviteCodeById>) => {
  const [updateInviteCode, { loading, error }] = useMutation(
    UPDATE_INVITE_CODE_MUTATION,
    {
      onCompleted: () => {
        toast.success('InviteCode updated')
        navigate(routes.inviteCodes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateInviteCodeInput,
    id: EditInviteCodeById['inviteCode']['id']
  ) => {
    updateInviteCode({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit InviteCode {inviteCode?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InviteCodeForm
          inviteCode={inviteCode}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
