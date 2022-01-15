export const schema = gql`
  type User {
    id: Int!
    uuid: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userRoles: [UserRole]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    uuid: String!
    email: String!
  }

  input UpdateUserInput {
    uuid: String
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
