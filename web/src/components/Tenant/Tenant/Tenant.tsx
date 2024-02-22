import type {
  DeleteTenantMutation,
  DeleteTenantMutationVariables,
  FindTenantById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_TENANT_MUTATION: TypedDocumentNode<
  DeleteTenantMutation,
  DeleteTenantMutationVariables
> = gql`
  mutation DeleteTenantMutation($id: String!) {
    deleteTenant(id: $id) {
      id
    }
  }
`

interface Props {
  tenant: NonNullable<FindTenantById['tenant']>
}

const Tenant = ({ tenant }: Props) => {
  const [deleteTenant] = useMutation(DELETE_TENANT_MUTATION, {
    onCompleted: () => {
      toast.success('Tenant deleted')
      navigate(routes.tenants())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTenantMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete tenant ' + id + '?')) {
      deleteTenant({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Tenant {tenant.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{tenant.id}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{tenant.slug}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{tenant.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(tenant.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(tenant.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTenant({ id: tenant.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(tenant.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Tenant
