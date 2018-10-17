import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import UserSubscription from "./UserSubscription";
import { meQuery } from "../../query";
import ChangeCreditCard from "./ChangeCreditCard";
import CancelSubscription from "./CancelSubscription";

class Account extends Component {
  render() {
    return (
      <Query query={meQuery}>
        {({ error, loading, data }) => {
          if (error) console.log(error);

          if (loading) return null;

          if (!data || !data.me) return <Redirect to="/login" />;

          return (
            <div className="container">
              <div className="row">
                <div className="col s4 offset-s4">
                  {data.me.type === "free-trials" ? (
                    <UserSubscription />
                  ) : (
                    <Fragment>
                      <p>Your current last 4 digits: {data.me.cclast4}</p>
                      <ChangeCreditCard />
                      <CancelSubscription />
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Account;
