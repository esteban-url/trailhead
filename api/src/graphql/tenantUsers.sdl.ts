export const schema = gql`
  type TenantUser {
    id: String!
    userId: String!
    tenantId: String!
    roleId: String!
    user: User!
    tenant: Tenant!
    role: TenantUserRole!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TenantUserRole {
    OWNER
    ADMIN
    MEMBER
  }

  type Query {
    tenantUsers: [TenantUser!]! @requireAuth
    tenantUser(id: String!): TenantUser @requireAuth
  }

  input CreateTenantUserInput {
    id: String
    userId: String!
    tenantId: String!
    roleId: String!
    role: TenantUserRole!
  }

  input UpdateTenantUserInput {
    userId: String
    tenantId: String
    roleId: String
    role: TenantUserRole
  }

  type Mutation {
    createTenantUser(input: CreateTenantUserInput!): TenantUser! @requireAuth
    updateTenantUser(id: String!, input: UpdateTenantUserInput!): TenantUser!
      @requireAuth
    deleteTenantUser(id: String!): TenantUser! @requireAuth
  }
`
