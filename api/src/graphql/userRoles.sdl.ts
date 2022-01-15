export const schema = gql`
  type UserRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    user: User
    userId: Int
  }

  type Query {
    userRoles: [UserRole!]! @requireAuth
    userRole(id: Int!): UserRole @requireAuth
  }

  input CreateUserRoleInput {
    name: String!
    userId: Int
  }

  input UpdateUserRoleInput {
    name: String
    userId: Int
  }

  type Mutation {
    createUserRole(input: CreateUserRoleInput!): UserRole! @requireAuth
    updateUserRole(id: Int!, input: UpdateUserRoleInput!): UserRole!
      @requireAuth
    deleteUserRole(id: Int!): UserRole! @requireAuth
  }
`
