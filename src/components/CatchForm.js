import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import './CatchForm.js';

export default class CatchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      pokemon: '',
      description: ''
    };
  }
  onChange = event => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  submit = () => {
    // Validation
    if (this.state.pokemon.length === 0) {
      return;
    }
    const newCatch = {
      _id: this.state.id,
      pokemon: this.state.pokemon,
      description: this.state.description,
      lat: this.props.newLocation.lat,
      lng: this.props.newLocation.lng
    };

    this.props.addCatch(newCatch);

    this.setState({
      id: 0,
      pokemon: '',
      description: ''
    });
  };

  render() {
    return (
      <Form id="catch_form">
        <Form.Field>
          <label>Pokemon</label>
          <input
            type="text"
            name="pokemon"
            onChange={this.onChange}
            value={this.state.pokemon}
          />
        </Form.Field>
        {this.props.newLocation ? (
          <p>
            lat: {this.props.newLocation.lat} lng: {this.props.newLocation.lng}
          </p>
        ) : (
          <p />
        )}
        <Form.Field>
          <label>Decription</label>
          <textarea
            name="description"
            onChange={this.onChange}
            value={this.state.description}
            form="tasks_form"
          />
        </Form.Field>
        <Button type="submit" onClick={this.submit}>
          Submit
        </Button>
      </Form>
    );
  }
}
