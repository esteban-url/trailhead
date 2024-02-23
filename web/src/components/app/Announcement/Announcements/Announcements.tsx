import type {
  DeleteAnnouncementMutation,
  DeleteAnnouncementMutationVariables,
  FindAnnouncements,
} from 'types/graphql'

import { Link, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/app/Announcement/AnnouncementsCell/AnnouncementsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const AnnouncementsList = ({ announcements }: FindAnnouncements) => {
  const { tenantSlug } = useParams()
  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Announcement deleted')
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

  const onDeleteClick = (id: DeleteAnnouncementMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete announcement ' + id + '?')) {
      deleteAnnouncement({ variables: { id } })
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
            <th>Message</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{truncate(announcement.id)}</td>
              <td>{truncate(announcement.tenantId)}</td>
              <td>{truncate(announcement.userId)}</td>
              <td>{truncate(announcement.message)}</td>
              <td>{timeTag(announcement.createdAt)}</td>
              <td>{timeTag(announcement.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.announcement({
                      id: announcement.id,
                      tenantSlug,
                    })}
                    title={'Show announcement ' + announcement.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAnnouncement({
                      id: announcement.id,
                      tenantSlug,
                    })}
                    title={'Edit announcement ' + announcement.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete announcement ' + announcement.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(announcement.id)}
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

export default AnnouncementsList
