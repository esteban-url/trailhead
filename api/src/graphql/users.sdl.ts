export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    role: GlobalRole!
    tenants: [TenantUser]!
    Annoucement: [Annoucement]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum GlobalRole {
    USER
    ADMIN
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String!
    role: GlobalRole!
  }

  input UpdateUserInput {
    email: String
    name: String
    role: GlobalRole
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
