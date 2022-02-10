export const schema = gql`
  type SupabaseUser {
    uuid: String!
    email: String!
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
    signUpSupabaseUser(input: CreateSupabaseUserInput!): SupabaseUser!
      @requireAuth
    resetPasswordForEmail(email: String!): Boolean @requireAuth
    sendMobileOTP(phone: String!): Boolean @requireAuth
    inviteUserByEmail(email: String!): Boolean @requireAuth
    deleteSupabaseUser(uuid: String!): Boolean @requireAuth
    generateSignupLink(email: String!, options: OptionsInput): Boolean
      @requireAuth
    generateMagicLink(email: String!, options: OptionsInput): Boolean
      @requireAuth
    generateRecoveryLink(email: String!, options: OptionsInput): Boolean
      @requireAuth
    generateInviteLink(email: String!, options: OptionsInput): Boolean
      @requireAuth
  }
`
