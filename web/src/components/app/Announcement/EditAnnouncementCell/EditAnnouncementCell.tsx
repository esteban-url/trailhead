import type {
  EditAnnouncementById,
  UpdateAnnouncementInput,
  UpdateAnnouncementMutationVariables,
} from 'types/graphql'

import { navigate, routes, useParams } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AnnouncementForm from 'src/components/app/Announcement/AnnouncementForm/AnnouncementForm'

export const QUERY: TypedDocumentNode<EditAnnouncementById> = gql`
  query EditAnnouncementById($id: String!) {
    announcement: announcement(id: $id) {
      id
      tenantId
      userId
      message
      createdAt
      updatedAt
    }
  }
`

const UPDATE_ANNOUNCEMENT_MUTATION: TypedDocumentNode<
  EditAnnouncementById,
  UpdateAnnouncementMutationVariables
> = gql`
  mutation UpdateAnnouncementMutation(
    $id: String!
    $input: UpdateAnnouncementInput!
  ) {
    updateAnnouncement(id: $id, input: $input) {
      id
      tenantId
      userId
      message
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  announcement,
}: CellSuccessProps<EditAnnouncementById>) => {
  const { tenantSlug } = useParams()
  const [updateAnnouncement, { loading, error }] = useMutation(
    UPDATE_ANNOUNCEMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Announcement updated')
        navigate(routes.announcements({ tenantSlug }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateAnnouncementInput,
    id: EditAnnouncementById['announcement']['id']
  ) => {
    updateAnnouncement({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Announcement {announcement?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AnnouncementForm
          announcement={announcement}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
