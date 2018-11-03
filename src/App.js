import React, { Component } from 'react';
import Main from './components/Main.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catches: [],
      newLocation: null
    };
  }

  componentDidMount() {
    this.getCatches();
  }

  pickLocation = (lat, lng) => {
    this.setState({ newLocation: { lat, lng } });
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

  render() {
    return (
      <div className="App">
        <Main
          addCatch={this.addCatch}
          catches={this.state.catches}
          newLocation={this.state.newLocation}
          pickLocation={this.pickLocation}
        />
      </div>
    );
  }
}

export default App;
