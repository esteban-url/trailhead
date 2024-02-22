import type {
  DeleteTenantMutation,
  DeleteTenantMutationVariables,
  FindTenants,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Tenant/TenantsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const TenantsList = ({ tenants }: FindTenants) => {
  const [deleteTenant] = useMutation(DELETE_TENANT_MUTATION, {
    onCompleted: () => {
      toast.success('Tenant deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTenantMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete tenant ' + id + '?')) {
      deleteTenant({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Slug</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{truncate(tenant.id)}</td>
              <td>{truncate(tenant.slug)}</td>
              <td>{truncate(tenant.name)}</td>
              <td>{timeTag(tenant.createdAt)}</td>
              <td>{timeTag(tenant.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.tenant({ id: tenant.id })}
                    title={'Show tenant ' + tenant.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTenant({ id: tenant.id })}
                    title={'Edit tenant ' + tenant.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete tenant ' + tenant.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(tenant.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TenantsList
