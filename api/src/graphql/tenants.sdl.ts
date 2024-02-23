export const schema = gql`
  type Tenant {
    id: String!
    slug: String!
    name: String!
    members: [TenantUser]!
    announcements: [Announcement]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    tenants: [Tenant!]! @requireAuth
    tenant(id: String!): Tenant @requireAuth
  }

  input CreateTenantInput {
    slug: String!
    name: String!
  }

  input UpdateTenantInput {
    slug: String
    name: String
  }

  type Mutation {
    createTenant(input: CreateTenantInput!): Tenant! @requireAuth
    updateTenant(id: String!, input: UpdateTenantInput!): Tenant! @requireAuth
    deleteTenant(id: String!): Tenant! @requireAuth
  }
`
