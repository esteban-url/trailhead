import type {
  FindAnnouncementsByTenant,
  FindAnnouncementsByTenantVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

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
  return (
    <div>
      <h2 className="text-xl font-bold">Announcements:</h2>
      {announcements.map((announcement) => (
        <div key={announcement.id}>
          <h3>{announcement.message}</h3>
          <p>{announcement.createdAt}</p>
        </div>
      ))}
    </div>
  )
}
