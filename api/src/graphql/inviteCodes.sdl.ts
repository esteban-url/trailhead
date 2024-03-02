export const schema = gql`
  type InviteCode {
    id: String!
    tenantId: String!
    userId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tenant: Tenant!
    user: User!
  }

  type Query {
    inviteCodes: [InviteCode!]! @requireAuth
    inviteCode(id: String!): InviteCode @requireAuth
  }

  input CreateInviteCodeInput {
    tenantSlug: String!
  }

  input UpdateInviteCodeInput {
    tenantSlug: String!
  }

  type Mutation {
    createInviteCode(input: CreateInviteCodeInput!): InviteCode! @requireAuth
    updateInviteCode(id: String!, input: UpdateInviteCodeInput!): InviteCode!
      @requireAuth
    deleteInviteCode(id: String!): InviteCode! @requireAuth
  }
`
