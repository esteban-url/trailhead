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

  type UserToLink {
    id: String!
    email: String
    phone: String
    username: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
    userToLink(id: String!): UserToLink @skipAuth
    # Custom queries
    userByIdentity(identity: String!): User @skipAuth
    userByEmail(email: String!): User @skipAuth
    userByPhone(phone: String!): User @skipAuth
    userByUsername(username: String!): User @skipAuth

    isIdentityUnique(identity: String!): Boolean @skipAuth
    isEmailUnique(email: String): Boolean @skipAuth
    isPhoneUnique(phone: String): Boolean @skipAuth
    isUsernameUnique(username: String!): Boolean @skipAuth
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

  # Custom inputs
  input SignUpUserInput {
    inviteCode: String
    id: String
    email: String
    phone: String
    username: String
    name: String
  }

  input LinkUserInput {
    id: String!
    supaId: String!
    email: String
    phone: String
    createdAt: DateTime
  }
  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    signUpUser(input: SignUpUserInput!): User! @skipAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
    # Custom mutations
    linkUser(input: LinkUserInput!): User! @skipAuth
  }
`
