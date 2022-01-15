import type { FindUserRoles } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import UserRoles from 'src/components/UserRole/UserRoles'

export const QUERY = gql`
  query FindUserRoles {
    userRoles {
      id
      createdAt
      updatedAt
      name
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userRoles yet. '}
      <Link
        to={routes.newUserRole()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userRoles }: CellSuccessProps<FindUserRoles>) => {
  return <UserRoles userRoles={userRoles} />
}
