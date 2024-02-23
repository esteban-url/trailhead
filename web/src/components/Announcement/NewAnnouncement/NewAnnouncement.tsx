import type {
  CreateAnnouncementMutation,
  CreateAnnouncementInput,
  CreateAnnouncementMutationVariables,
} from 'types/graphql'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AnnouncementForm from 'src/components/Announcement/AnnouncementForm'

const CREATE_ANNOUNCEMENT_MUTATION: TypedDocumentNode<
  CreateAnnouncementMutation,
  CreateAnnouncementMutationVariables
> = gql`
  mutation CreateAnnouncementMutation($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      id
    }
  }
`

const NewAnnouncement = () => {
  const { tenantSlug } = useParams()
  const [createAnnouncement, { loading, error }] = useMutation(
    CREATE_ANNOUNCEMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Announcement created')
        navigate(routes.announcements({ tenantSlug }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateAnnouncementInput) => {
    createAnnouncement({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Announcement</h2>
      </header>
      <div className="rw-segment-main">
        <AnnouncementForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAnnouncement
