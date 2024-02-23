import type {
  FindAnnouncementsByTenant,
  FindAnnouncementsByTenantVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import AnnouncementBoard from '../AnnouncementBoard/AnnouncementBoard'

export const QUERY: TypedDocumentNode<
  FindAnnouncementsByTenant,
  FindAnnouncementsByTenantVariables
> = gql`
  query FindAnnouncementsByTenant($tenantSlug: String!) {
    announcements: announcementsByTenantSlug(tenantSlug: $tenantSlug) {
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

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAnnouncementsByTenantVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  announcements,
}: CellSuccessProps<
  FindAnnouncementsByTenant,
  FindAnnouncementsByTenantVariables
>) => {
  return <AnnouncementBoard announcements={announcements} />
}
