export const schema = gql`
  type User {
    id: String!
    email: String
    phone: String
    username: String
    name: String
    tenants: [TenantUser]!
    Announcement: [Announcement]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    id: String
    email: String
    phone: String
    username: String
    name: String
  }

  input UpdateUserInput {
    email: String
    phone: String
    username: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
