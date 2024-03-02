import type {
  FindInviteCodeById,
  FindInviteCodeByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import InviteCode from 'src/components/app/InviteCode/InviteCode/InviteCode'

export const QUERY: TypedDocumentNode<
  FindInviteCodeById,
  FindInviteCodeByIdVariables
> = gql`
  query FindInviteCodeById($id: String!) {
    inviteCode: inviteCode(id: $id) {
      id
      tenantId
      userId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>InviteCode not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindInviteCodeByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  inviteCode,
}: CellSuccessProps<FindInviteCodeById, FindInviteCodeByIdVariables>) => {
  return <InviteCode inviteCode={inviteCode} />
}
