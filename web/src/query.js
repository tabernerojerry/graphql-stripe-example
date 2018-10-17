import { gql } from "apollo-boost";

// User Fragments
export const userFragment = gql`
  fragment UserInfo on User {
    id
    email
    type
    cclast4
  }
`;

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${userFragment}
`;
