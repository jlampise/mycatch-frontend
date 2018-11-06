import React, { Component } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (event, data) => {
    let state = {};
    state[data.name] = data.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    if (event.target.name === 'register') {
      this.props.register(user);
    } else {
      this.props.login(user);
    }
    this.setState({ username: '', password: '' });
  };

  isValidForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <Grid.Row className="login-form-container">
        <Grid.Column width={16}>
          <Form className="login-form">
            <Form.Input
              label="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <Form.Input
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <Button
              disabled={!this.isValidForm()}
              onClick={this.onSubmit}
              name="register"
            >
              Register
            </Button>
            <Button
              disabled={!this.isValidForm()}
              onClick={this.onSubmit}
              name="login"
            >
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    );
  }
}
