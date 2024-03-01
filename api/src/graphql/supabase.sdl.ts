export const schema = gql`
  type SignUp {
    id: String!
    email: String
    phone: String
  }
  input SignUpInput {
    type: String!
    identifier: String!
    name: String
    code: String
  }
  type Mutation {
    signUp(input: SignUpInput!): SignUp! @skipAuth
  }
`
