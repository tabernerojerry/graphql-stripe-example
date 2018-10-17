import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const registerMutation = gql`
  mutation Register($input: Input!) {
    register(input: $input)
  }
`;

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  _onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  _onSubmit = register => async event => {
    event.preventDefault();

    await register({
      variables: { input: this.state }
    });

    return this.props.history.push("/login");
  };

  _renderProp = (register, { error, loading }) => {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <form
            className="col s4 offset-s4"
            onSubmit={this._onSubmit(register)}
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  render() {
    return <Mutation mutation={registerMutation}>{this._renderProp}</Mutation>;
  }
}

export default Register;
