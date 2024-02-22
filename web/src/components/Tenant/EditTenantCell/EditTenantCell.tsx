import type {
  EditTenantById,
  UpdateTenantInput,
  UpdateTenantMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TenantForm from 'src/components/Tenant/TenantForm'

export const QUERY: TypedDocumentNode<EditTenantById> = gql`
  query EditTenantById($id: String!) {
    tenant: tenant(id: $id) {
      id
      slug
      name
      createdAt
      updatedAt
    }
  }
`

const UPDATE_TENANT_MUTATION: TypedDocumentNode<
  EditTenantById,
  UpdateTenantMutationVariables
> = gql`
  mutation UpdateTenantMutation($id: String!, $input: UpdateTenantInput!) {
    updateTenant(id: $id, input: $input) {
      id
      slug
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ tenant }: CellSuccessProps<EditTenantById>) => {
  const [updateTenant, { loading, error }] = useMutation(
    UPDATE_TENANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tenant updated')
        navigate(routes.tenants())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTenantInput,
    id: EditTenantById['tenant']['id']
  ) => {
    updateTenant({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Tenant {tenant?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TenantForm
          tenant={tenant}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
