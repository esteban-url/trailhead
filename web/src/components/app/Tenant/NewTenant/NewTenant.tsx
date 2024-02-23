import type {
  CreateTenantMutation,
  CreateTenantInput,
  CreateTenantMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TenantForm from 'src/components/app/Tenant/TenantForm/TenantForm'

const CREATE_TENANT_MUTATION: TypedDocumentNode<
  CreateTenantMutation,
  CreateTenantMutationVariables
> = gql`
  mutation CreateTenantMutation($input: CreateTenantInput!) {
    createTenant(input: $input) {
      id
    }
  }
`

const NewTenant = () => {
  const [createTenant, { loading, error }] = useMutation(
    CREATE_TENANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tenant created')
        navigate(routes.tenants())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTenantInput) => {
    createTenant({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Tenant</h2>
      </header>
      <div className="rw-segment-main">
        <TenantForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTenant
