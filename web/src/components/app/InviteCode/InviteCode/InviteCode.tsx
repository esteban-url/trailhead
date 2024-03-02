import type {
  DeleteInviteCodeMutation,
  DeleteInviteCodeMutationVariables,
  FindInviteCodeById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  inviteCode: NonNullable<FindInviteCodeById['inviteCode']>
}

const InviteCode = ({ inviteCode }: Props) => {
  const [deleteInviteCode] = useMutation(DELETE_INVITE_CODE_MUTATION, {
    onCompleted: () => {
      toast.success('InviteCode deleted')
      navigate(routes.inviteCodes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteInviteCodeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete inviteCode ' + id + '?')) {
      deleteInviteCode({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            InviteCode {inviteCode.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{inviteCode.id}</td>
            </tr>
            <tr>
              <th>Tenant id</th>
              <td>{inviteCode.tenantId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{inviteCode.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(inviteCode.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(inviteCode.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editInviteCode({ id: inviteCode.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(inviteCode.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default InviteCode
