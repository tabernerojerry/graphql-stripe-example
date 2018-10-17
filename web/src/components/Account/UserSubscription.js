import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { userFragment } from "../../query";

const createSubscriptionMutation = gql`
  mutation CreateSubscription($source: String!, $cclast4: String!) {
    createSubscription(source: $source, cclast4: $cclast4) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

class UserSubscription extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s4 offset-s4">
            <Mutation mutation={createSubscriptionMutation}>
              {mutate => (
                <StripeCheckout
                  token={async token => {
                    const response = await mutate({
                      variables: { source: token.id, cclast4: token.card.last4 }
                    });
                    console.log(response);
                  }}
                  stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
                  amount={1000}
                >
                  <button
                    className="btn blue"
                    style={{ width: "160px", marginTop: "24px" }}
                  >
                    Pay with card
                  </button>
                </StripeCheckout>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSubscription;
