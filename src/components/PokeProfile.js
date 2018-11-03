import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './PokeProfile.css';

export default class PokeProfile extends Component {

  render() {
    if (!this.props.pokemon) {
      return null;
    }
    const pokemon = this.props.pokemon;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <img src={pokemon.sprites.front_default} alt="" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <ul>
              { pokemon.stats.map((stat) => { return (<li>{stat.stat.name}: {stat.base_stat}</li>);})}
            </ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
