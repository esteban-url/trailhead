export const schema = gql`
  type Announcement {
    id: String!
    tenantId: String!
    userId: String!
    message: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    tenant: Tenant!
  }

  type Query {
    announcements: [Announcement!]! @requireAuth
    announcement(id: String!): Announcement @requireAuth
    announcementsByTenantSlug(tenantSlug: String!): [Announcement!] @requireAuth
  }

  input CreateAnnouncementInput {
    id: String
    tenantId: String!
    userId: String!
    message: String!
  }

  input UpdateAnnouncementInput {
    tenantId: String
    userId: String
    message: String
  }

  type Mutation {
    createAnnouncement(input: CreateAnnouncementInput!): Announcement!
      @requireAuth
    updateAnnouncement(
      id: String!
      input: UpdateAnnouncementInput!
    ): Announcement! @requireAuth
    deleteAnnouncement(id: String!): Announcement! @requireAuth
  }
`
