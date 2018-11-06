import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Map from './Map';
import CatchForm from './CatchForm';
import './Dashboard.css';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Grid container>
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
            <Grid.Column width={8}>
              <CatchForm
                addCatch={this.props.addCatch}
                updateCatch={this.props.updateCatch}
                deleteCatch={this.props.deleteCatch}
                pickedLocation={this.props.pickedLocation}
                pickedCatch={this.props.pickedCatch}
                resetPicks={this.props.resetPicks}
                pokeData={this.props.pokeData}
                updatePokeData={this.props.updatePokeData}
                resetPokeData={this.props.resetPokeData}
                allPokeList={this.props.allPokeList}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
