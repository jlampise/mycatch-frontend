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
              <Map catches={this.props.catches} pickLocation={this.props.pickLocation}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <CatchForm addCatch={this.props.addCatch} newLocation={this.props.newLocation} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
