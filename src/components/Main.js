import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Map from './Map';
import CatchForm from './CatchForm';
import './Main.css';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid.Row>
            <Grid.Column width={10}>
              <Map
                catches={this.props.catches}
                pickNewLocation={this.props.pickNewLocation}
                pickOldCatch={this.props.pickOldCatch}
                pickedLocation={this.props.pickedLocation}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <CatchForm
                addCatch={this.props.addCatch}
                updateCatch={this.props.updateCatch}
                deleteCatch={this.props.deleteCatch}
                pickedLocation={this.props.pickedLocation}
                pickedCatch={this.props.pickedCatch}
                resetPicks={this.props.resetPicks}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
