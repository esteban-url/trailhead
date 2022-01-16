export const schema = gql`
  type SupabaseUser {
    email: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateSupabaseUserInput {
    email: String!
    password: String!
  }
  input OptionsDataInput {
    data: JSONObject
    password: String
    redirectTo: String
  }
  input OptionsInput {
    password: String
    data: OptionsDataInput
    redirectTo: String
  }

  type Mutation {
    createSupabaseUser(input: CreateSupabaseUserInput!): SupabaseUser!
      @requireAuth
    resetPasswordForEmail(email: String!): Boolean @requireAuth
    sendMobileOTP(phone: String!): Boolean @requireAuth
    inviteUserByEmail(email: String!): Boolean @requireAuth
    deleteSupabaseUser(uuid: String!): String! @requireAuth

    generateSignupLink(email: String!, options: OptionsInput): Boolean
      @requireAuth
    generateMagicLink(email: String!, options: OptionsInput): Boolean
      @requireAuth
    generateRecoverylink(email: String!, options: OptionsInput): Boolean
      @requireAuth
    generateInviteink(email: String!, options: OptionsInput): Boolean
      @requireAuth
  }
`
