import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

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

  onTextAreaChange = (event, data) => {
    if (data.name === 'description') {
      this.setState({ description: data.value });
    }
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
      <Form id="catch_form">
        <Form.Dropdown
          label="Pokemon"
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

        <Form.Input
          placeholder="Automatically filled"
          label="Trainer"
          disabled
          type="text"
          name="trainer"
          value={this.state.trainer}
        />

        <Form.Input
          label="Latitude"
          disabled
          type="text"
          value={this.state.lat}
        />

        <Form.Input
          label="Longitude"
          disabled
          type="text"
          value={this.state.lng}
        />

        <Form.TextArea
          label="Description"
          placeholder="Record your memories..."
          disabled={this.isReadOnly()}
          name="description"
          onChange={this.onTextAreaChange}
          value={this.state.description}
        />
        <Form.Field>{this.renderButtons()}</Form.Field>
      </Form>
    );
  }
}
