import React, { Component } from 'react';
import { Grid, Form, Button, Dropdown } from 'semantic-ui-react';
import PokeProfile from './PokeProfile';
import './CatchForm.js';

export default class CatchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: 0,
      pokemon: '',
      description: '',
      lat: 0,
      lng: 0,
      pokeOptions: []
    };
  }
  componentDidUpdate() {
    if (
      this.state.pokeOptions.length === 0 &&
      this.props.allPokeList.length > 0
    ) {
      this.setState({
        pokeOptions: this.props.allPokeList.map(pokemon => {
          return { key: pokemon, value: pokemon, text: pokemon };
        })
      });
    }
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.pickedCatch) {
      const c = newProps.pickedCatch;
      if (c._id !== prevState._id) {
        newProps.updatePokeData(c.pokemon);
        return {
          _id: c._id,
          pokemon: c.pokemon,
          description: c.description,
          lat: c.lat,
          lng: c.lng
        };
      }
    } else if (newProps.pickedLocation) {
      if (prevState._id) {
        newProps.resetPokeData();
        return {
          _id: 0,
          pokemon: '',
          description: '',
          lat: newProps.pickedLocation.lat,
          lng: newProps.pickedLocation.lng
        };
      } else if (
        prevState.lat !== newProps.pickedLocation.lat ||
        prevState.lng !== newProps.pickedLocation.lng
      ) {
        return {
          lat: newProps.pickedLocation.lat,
          lng: newProps.pickedLocation.lng
        };
      }
    }
    return null;
  }

  onDropdownChange = (event, data) => {
    if (data.name === 'pokemon') {
      this.setState({ pokemon: data.value });
      this.props.updatePokeData(data.value);
    }
  };

  onTextareaChange = event => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  submit = () => {
    // Validation
    if (this.state.pokemon.length === 0) {
      return;
    }

    this.props.resetPicks();
    this.props.resetPokeData();

    const newCatch = {
      _id: this.state._id,
      pokemon: this.state.pokemon,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng
    };

    if (newCatch._id) {
      this.props.updateCatch(newCatch);
    } else {
      this.props.addCatch(newCatch);
    }
    this.setState({
      _id: 0,
      pokemon: '',
      description: '',
      lat: 0,
      lng: 0
    });
  };

  delete = () => {
    if (this.state._id) {
      this.props.resetPicks();
      this.props.resetPokeData();
      this.props.deleteCatch(this.state._id);
      this.setState({
        _id: 0,
        pokemon: '',
        description: '',
        lat: 0,
        lng: 0
      });
    }
  };

  cancel = () => {
    this.props.resetPicks();
    this.props.resetPokeData();
    this.setState({
      _id: 0,
      pokemon: '',
      description: '',
      lat: 0,
      lng: 0
    });
  };

  renderButtons() {
    if (this.props.pickedCatch) {
      return (
        <div>
          <Button onClick={this.submit}>Save</Button>
          <Button onClick={this.delete}>Delete</Button>
          <Button onClick={this.cancel}>Cancel</Button>
        </div>
      );
    } else if (this.props.pickedLocation) {
      return (
        <div>
          <Button onClick={this.submit}>Create</Button>
          <Button onClick={this.cancel}>Cancel</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form id="catch_form">
              <Form.Field>
                <label>Pokemon</label>
                <Dropdown
                  name="pokemon"
                  onChange={this.onDropdownChange}
                  value={this.state.pokemon}
                  placeholder="Select Pokemon"
                  fluid
                  search
                  selection
                  options={this.state.pokeOptions}
                />
              </Form.Field>

              <Form.Field>
                <label>Latitude</label>
                <input
                  disabled
                  type="text"
                  name="latitude"
                  value={this.state.lat}
                />
              </Form.Field>
              <Form.Field>
                <label>Longitude</label>
                <input
                  disabled
                  type="text"
                  name="longitude"
                  value={this.state.lng}
                />
              </Form.Field>
              <Form.Field>
                <label>Decription</label>
                <textarea
                  name="description"
                  onChange={this.onTextareaChange}
                  value={this.state.description}
                  form="tasks_form"
                />
              </Form.Field>
              {this.renderButtons()}
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
            <PokeProfile pokemon={this.props.pokeData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
