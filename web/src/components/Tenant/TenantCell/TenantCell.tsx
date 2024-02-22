import type { FindTenantById, FindTenantByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Tenant from 'src/components/Tenant/Tenant'

export const QUERY: TypedDocumentNode<
  FindTenantById,
  FindTenantByIdVariables
> = gql`
  query FindTenantById($id: String!) {
    tenant: tenant(id: $id) {
      id
      slug
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Tenant not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTenantByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  tenant,
}: CellSuccessProps<FindTenantById, FindTenantByIdVariables>) => {
  return <Tenant tenant={tenant} />
}
