import type { FindTenants, FindTenantsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Tenants from 'src/components/app/Tenant/Tenants/Tenants'

export const QUERY: TypedDocumentNode<FindTenants, FindTenantsVariables> = gql`
  query FindTenants {
    tenants {
      id
      slug
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tenants yet. '}
      <Link to={routes.newTenant()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindTenants>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  tenants,
}: CellSuccessProps<FindTenants, FindTenantsVariables>) => {
  return <Tenants tenants={tenants} />
}
