import React, { Component } from 'react';
import _ from 'lodash';
import Main from './components/Main.js';
import Pokedex from 'pokedex-promise-v2';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.pokedex = new Pokedex({
      protocol: 'https',
      cache: true
    });
    this.state = {
      catches: [],
      pickedLocation: null,
      pickedCatch: null,
      pokeData: null
    };
  }

  componentDidMount() {
    this.getCatches();
  }

  resetPicks = () => {
    this.setState({
      pickedCatch: null,
      pickedLocation: null
    });
  };

  resetPokeData = () => {
    this.setState({ pokeData: null });
  };

  updatePokeData = _.debounce(pokeName => {
    this.pokedex
      .getPokemonByName(pokeName)
      .then(response => {
        this.setState({ pokeData: response });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ pokeData: null });
      });
  }, 300);

  pickOldCatch = id => {
    const catches = this.state.catches;
    for (let i = 0; i < catches.length; i++) {
      if (catches[i]._id === id) {
        this.setState({
          pickedCatch: Object.assign({}, catches[i]),
          pickedLocation: null
        });
        return;
      }
    }
  };

  pickNewLocation = (lat, lng) => {
    this.setState({ pickedLocation: { lat, lng }, pickedCatch: null });
  };

  getCatches = () => {
    const fetchObject = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/api/catches', fetchObject)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              this.setState({ catches: data });
            })
            .catch(error => {
              console.warn(error);
            });
        } else {
          console.warn('Server responded with status: ' + response.status);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  addCatch = c => {
    const addCatch = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(c)
    };

    fetch('/api/catches', addCatch)
      .then(response => {
        if (response.ok) {
          this.getCatches();
        } else {
          console.warn('Server responded with status: ' + response.status);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  updateCatch = newData => {
    const updateCatch = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    };

    fetch('/api/catches/' + newData._id, updateCatch)
      .then(response => {
        if (response.ok) {
          this.getCatches();
        } else {
          console.warn('Server responded with status: ' + response.status);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  deleteCatch = id => {
    const deleteCatch = {
      method: 'DELETE',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/api/catches/' + id, deleteCatch)
      .then(response => {
        if (response.ok) {
          this.getCatches();
        } else {
          console.warn('Server responded with status: ' + response.status);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  render() {
    return (
      <div className="App">
        <Main
          addCatch={this.addCatch}
          updateCatch={this.updateCatch}
          deleteCatch={this.deleteCatch}
          catches={this.state.catches}
          pickedLocation={this.state.pickedLocation}
          pickNewLocation={this.pickNewLocation}
          pickedCatch={this.state.pickedCatch}
          pickOldCatch={this.pickOldCatch}
          resetPicks={this.resetPicks}
          pokeData={this.state.pokeData}
          updatePokeData={this.updatePokeData}
          resetPokeData={this.resetPokeData}
        />
      </div>
    );
  }
}

export default App;
