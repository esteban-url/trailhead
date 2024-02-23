import type {
  FindAnnouncements,
  FindAnnouncementsVariables,
} from 'types/graphql'

import { Link, routes, useParams } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Announcements from 'src/components/Announcement/Announcements'

export const QUERY: TypedDocumentNode<
  FindAnnouncements,
  FindAnnouncementsVariables
> = gql`
  query FindAnnouncements {
    announcements {
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

export const Empty = () => {
  const { tenantSlug } = useParams()
  return (
    <div className="rw-text-center">
      {'No announcements yet. '}
      <Link to={routes.newAnnouncement({ tenantSlug })} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindAnnouncements>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  announcements,
}: CellSuccessProps<FindAnnouncements, FindAnnouncementsVariables>) => {
  return <Announcements announcements={announcements} />
}
