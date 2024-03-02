import type { FindInviteCodes, FindInviteCodesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import InviteCodes from 'src/components/app/InviteCode/InviteCodes/InviteCodes'

export const QUERY: TypedDocumentNode<
  FindInviteCodes,
  FindInviteCodesVariables
> = gql`
  query FindInviteCodes {
    inviteCodes {
      id
      tenantId
      userId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No inviteCodes yet. '}
      <Link to={routes.newInviteCode()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindInviteCodes>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  inviteCodes,
}: CellSuccessProps<FindInviteCodes, FindInviteCodesVariables>) => {
  return <InviteCodes inviteCodes={inviteCodes} />
}
