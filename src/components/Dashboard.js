import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Map from './Map';
import CatchForm from './CatchForm';
import PokeProfile from './PokeProfile';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Grid container className="dashboard-container">
          <Grid.Row>
            <Grid.Column width={8}>
              <Map
                catches={this.props.catches}
                pickNewLocation={this.props.pickNewLocation}
                pickOldCatch={this.props.pickOldCatch}
                pickedLocation={this.props.pickedLocation}
                pickedCatch={this.props.pickedCatch}
              />
            </Grid.Column>
            <Grid.Column width={4} className="catch-form-container">
              <CatchForm
                addCatch={this.props.addCatch}
                updateCatch={this.props.updateCatch}
                deleteCatch={this.props.deleteCatch}
                pickedLocation={this.props.pickedLocation}
                pickedCatch={this.props.pickedCatch}
                resetPicks={this.props.resetPicks}
                updatePokeData={this.props.updatePokeData}
                resetPokeData={this.props.resetPokeData}
                allPokeList={this.props.allPokeList}
                currentUser={this.props.currentUser}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <PokeProfile pokemon={this.props.pokeData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
