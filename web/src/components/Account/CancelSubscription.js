import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import { userFragment } from "../../query";

const cancelSubscriptionMutation = gql`
  mutation CancelSubscription {
    cancelSubscription {
      ...UserInfo
    }
  }

  ${userFragment}
`;

const CancelSubscription = () => (
  <Mutation mutation={cancelSubscriptionMutation}>
    {mutate => (
      <button
        onClick={() => mutate()}
        className="btn red"
        style={{ width: "195px" }}
      >
        Cancel Subscription
      </button>
    )}
  </Mutation>
);

export default CancelSubscription;
