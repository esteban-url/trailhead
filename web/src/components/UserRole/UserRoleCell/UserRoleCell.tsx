import type { FindUserRoleById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserRole from 'src/components/UserRole/UserRole'

export const QUERY = gql`
  query FindUserRoleById($id: Int!) {
    userRole: userRole(id: $id) {
      id
      createdAt
      updatedAt
      name
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserRole not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userRole }: CellSuccessProps<FindUserRoleById>) => {
  return <UserRole userRole={userRole} />
}
