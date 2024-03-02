import type {
  DeleteInviteCodeMutation,
  DeleteInviteCodeMutationVariables,
  FindInviteCodes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/app/InviteCode/InviteCodesCell/InviteCodesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_INVITE_CODE_MUTATION: TypedDocumentNode<
  DeleteInviteCodeMutation,
  DeleteInviteCodeMutationVariables
> = gql`
  mutation DeleteInviteCodeMutation($id: String!) {
    deleteInviteCode(id: $id) {
      id
    }
  }
`

const InviteCodesList = ({ inviteCodes }: FindInviteCodes) => {
  const [deleteInviteCode] = useMutation(DELETE_INVITE_CODE_MUTATION, {
    onCompleted: () => {
      toast.success('InviteCode deleted')
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

  const onDeleteClick = (id: DeleteInviteCodeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete inviteCode ' + id + '?')) {
      deleteInviteCode({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tenant id</th>
            <th>User id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {inviteCodes.map((inviteCode) => (
            <tr key={inviteCode.id}>
              <td>{truncate(inviteCode.id)}</td>
              <td>{truncate(inviteCode.tenantId)}</td>
              <td>{truncate(inviteCode.userId)}</td>
              <td>{timeTag(inviteCode.createdAt)}</td>
              <td>{timeTag(inviteCode.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.inviteCode({ id: inviteCode.id })}
                    title={'Show inviteCode ' + inviteCode.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInviteCode({ id: inviteCode.id })}
                    title={'Edit inviteCode ' + inviteCode.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete inviteCode ' + inviteCode.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(inviteCode.id)}
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

export default InviteCodesList
