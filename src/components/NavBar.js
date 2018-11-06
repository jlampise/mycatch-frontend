import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default class NavBar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={8}>
          <h1>MyCatch</h1>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button onClick={this.handleLogout}>Logout</Button>
        </Grid.Column>
      </Grid>
    );
  }
}
