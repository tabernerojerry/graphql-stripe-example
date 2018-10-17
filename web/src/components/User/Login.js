import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { meQuery, userFragment } from "../../query";

const loginMutation = gql`
  mutation Login($input: Input!) {
    login(input: $input) {
      ...UserInfo
    }
  }

  ${userFragment}
`;

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  _onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  _onSubmit = ({ login, client }) => async event => {
    event.preventDefault();

    // Optional Reset Cache
    await client.resetStore();

    await login({
      variables: { input: this.state },
      update: (cache, { data }) => {
        if (!data || !data.login) return;

        cache.writeQuery({
          query: meQuery,
          data: { me: data.login }
        });
      }
    });

    return this.props.history.push("/account");
  };

  _renderProp = (login, { client }) => {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <form
            className="col s4 offset-s4"
            onSubmit={this._onSubmit({ login, client })}
          >
            <div className="input-field col s12">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={this._onChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this._onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  render() {
    return <Mutation mutation={loginMutation}>{this._renderProp}</Mutation>;
  }
}

export default Login;
