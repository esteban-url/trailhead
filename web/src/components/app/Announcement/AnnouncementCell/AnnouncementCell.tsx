import type {
  FindAnnouncementById,
  FindAnnouncementByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Announcement from 'src/components/app/Announcement/Announcement/Announcement'

export const QUERY: TypedDocumentNode<
  FindAnnouncementById,
  FindAnnouncementByIdVariables
> = gql`
  query FindAnnouncementById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Announcement not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAnnouncementByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  announcement,
}: CellSuccessProps<FindAnnouncementById, FindAnnouncementByIdVariables>) => {
  return <Announcement announcement={announcement} />
}
