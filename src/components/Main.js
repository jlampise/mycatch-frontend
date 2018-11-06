import React, { Component } from 'react';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import { Switch, Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import NavBar from './NavBar';

export default class Main extends Component {
  render() {
    return (
      <Grid container className="main-container">
        <Grid.Row>
          <NavBar isLogged={this.props.isLogged} logout={this.props.logout} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return !this.props.isLogged ? (
                    <LoginForm
                      register={this.props.register}
                      login={this.props.login}
                    />
                  ) : (
                    <Redirect to="/dashboard" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return this.props.isLogged ? (
                    <Dashboard
                      addCatch={this.props.addCatch}
                      updateCatch={this.props.updateCatch}
                      deleteCatch={this.props.deleteCatch}
                      catches={this.props.catches}
                      pickedLocation={this.props.pickedLocation}
                      pickNewLocation={this.props.pickNewLocation}
                      pickedCatch={this.props.pickedCatch}
                      pickOldCatch={this.props.pickOldCatch}
                      resetPicks={this.props.resetPicks}
                      pokeData={this.props.pokeData}
                      updatePokeData={this.props.updatePokeData}
                      resetPokeData={this.props.resetPokeData}
                      allPokeList={this.props.allPokeList}
                      currentUser={this.props.currentUser}
                    />
                  ) : (
                    <Redirect to="/" />
                  );
                }}
              />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
