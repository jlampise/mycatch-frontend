import React, { Component } from 'react';
import { Grid, Form, Button, Dropdown } from 'semantic-ui-react';
import PokeProfile from './PokeProfile';

export default class CatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      pokemon: '',
      trainer: '',
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
          trainer: c.creator,
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
          trainer: newProps.currentUser,
          description: '',
          lat: newProps.pickedLocation.lat,
          lng: newProps.pickedLocation.lng
        };
      } else if (
        prevState.lat !== newProps.pickedLocation.lat ||
        prevState.lng !== newProps.pickedLocation.lng
      ) {
        return {
          trainer: newProps.currentUser,
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
    if (!this.isValidForm()) {
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
    this.resetState();
  };

  delete = () => {
    if (this.state._id) {
      this.props.resetPicks();
      this.props.resetPokeData();
      this.props.deleteCatch(this.state._id);
      this.resetState();
    }
  };

  cancel = () => {
    this.props.resetPicks();
    this.props.resetPokeData();
    this.resetState();
  };

  resetState() {
    this.setState({
      _id: 0,
      pokemon: '',
      trainer: '',
      description: '',
      lat: 0,
      lng: 0
    });
  }

  isValidForm() {
    return this.state.pokemon !== '' && this.state.trainer !== '';
  }
  isReadOnly() {
    return this.props.currentUser !== this.state.trainer;
  }

  renderButtons() {
    if (this.props.pickedCatch) {
      return (
        <div>
          <Button
            disabled={!this.isValidForm() || this.isReadOnly()}
            onClick={this.submit}
          >
            Save
          </Button>
          <Button disabled={this.isReadOnly()} onClick={this.delete}>
            Delete
          </Button>
          <Button disabled={this.isReadOnly()} onClick={this.cancel}>
            Cancel
          </Button>
        </div>
      );
    } else if (this.props.pickedLocation) {
      return (
        <div>
          <Button disabled={!this.isValidForm()} onClick={this.submit}>
            Create
          </Button>
          <Button onClick={this.cancel}>Cancel</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <Grid className="catch-container">
        <Grid.Row>
          <Grid.Column width={8} className="catch-form-container">
            <Form id="catch_form">
              <Form.Field>
                <label>Pokemon</label>
                <Dropdown
                  disabled={this.isReadOnly()}
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
                <label>Trainer</label>
                <input
                  disabled
                  type="text"
                  name="trainer"
                  value={this.state.trainer}
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
                  placeholder="Record your memories..."
                  disabled={this.isReadOnly()}
                  name="description"
                  onChange={this.onTextareaChange}
                  value={this.state.description}
                />
              </Form.Field>
              <Form.Field>{this.renderButtons()}</Form.Field>
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
