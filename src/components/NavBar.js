import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default class NavBar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Grid.Row className="navbar-container">
        <Grid.Column width={14}>
          <h1>MyCatch</h1>
        </Grid.Column>
        <Grid.Column width={2}>
          {this.props.isLogged ? (
            <Button onClick={this.handleLogout}>
              Logout
              <p>({this.props.currentUser})</p>
            </Button>
          ) : null}
        </Grid.Column>
      </Grid.Row>
    );
  }
}
