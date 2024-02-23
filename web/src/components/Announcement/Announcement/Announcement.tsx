import type {
  DeleteAnnouncementMutation,
  DeleteAnnouncementMutationVariables,
  FindAnnouncementById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ANNOUNCEMENT_MUTATION: TypedDocumentNode<
  DeleteAnnouncementMutation,
  DeleteAnnouncementMutationVariables
> = gql`
  mutation DeleteAnnouncementMutation($id: String!) {
    deleteAnnouncement(id: $id) {
      id
    }
  }
`

interface Props {
  announcement: NonNullable<FindAnnouncementById['announcement']>
}

const Announcement = ({ announcement }: Props) => {
  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Announcement deleted')
      navigate(routes.announcements())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAnnouncementMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete announcement ' + id + '?')) {
      deleteAnnouncement({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Announcement {announcement.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{announcement.id}</td>
            </tr>
            <tr>
              <th>Tenant id</th>
              <td>{announcement.tenantId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{announcement.userId}</td>
            </tr>
            <tr>
              <th>Message</th>
              <td>{announcement.message}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(announcement.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(announcement.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAnnouncement({ id: announcement.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(announcement.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Announcement
