export default `
  type Identity {
    id: ID!
    name: String
    claims: [Claim]
    profile: ProfileData
  }

  type ProfileData {
    id: ID!
    firstName: String
    lastName: String
    description: String
    avatar: String

    facebookVerified: Boolean
    twitterVerified: Boolean
    airbnbVerified: Boolean
    phoneVerified: Boolean
    emailVerified: Boolean
  }

  type Claim {
    id: ID!
    topic: String
    scheme: String
    issuer: String
    signature: String
    data: String
    uri: String
  }
`
