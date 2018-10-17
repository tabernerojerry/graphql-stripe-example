import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { userFragment } from "../../query";

const changeCreditCardMutation = gql`
  mutation ChangeCreditCard($source: String!, $cclast4: String!) {
    changeCreditCard(source: $source, cclast4: $cclast4) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

class ChangeCreditCard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s4 offset-s4">
            <Mutation mutation={changeCreditCardMutation}>
              {mutate => (
                <StripeCheckout
                  token={async token => {
                    const response = await mutate({
                      variables: { source: token.id, cclast4: token.card.last4 }
                    });
                    console.log(response);
                  }}
                  stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
                  panelLabel="Change Card"
                >
                  <button className="btn" style={{ width: "200px" }}>
                    Change Credit Card
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

export default ChangeCreditCard;
