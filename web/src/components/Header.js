import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import { meQuery } from "../query";

class Header extends Component {
  render() {
    return (
      <nav className="teal">
        <div className="container nav-wrapper">
          <Link to="/" className="brand-logo">
            Stripe Example
          </Link>

          <ul className="right">
            <Query query={meQuery}>
              {({ data, loading }) => {
                console.log(data);
                if (loading) return null;

                if (!data)
                  return (
                    <Fragment>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                    </Fragment>
                  );

                return (
                  <li>
                    <Link to="/account">Account</Link>
                  </li>
                );
              }}
            </Query>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
