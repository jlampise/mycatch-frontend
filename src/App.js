import React, { Component } from 'react';
import _ from 'lodash';
import Main from './components/Main.js';
import Pokedex from 'pokedex-promise-v2';

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
      pokeData: null,
      allPokeList: [],
      isLogged: false,
      token: '',
      currentUser: ''
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('isLogged')) {
      const temp = sessionStorage.getItem('isLogged');
      const isLogged = temp === 'true' ? true : false;
      const token = sessionStorage.getItem('token');
      const currentUser = sessionStorage.getItem('currentUser');
      this.setState({ isLogged, token, currentUser });
      if (isLogged) {
        this.getCatches(token);
        this.pokedex
          .getPokemonsList()
          .then(response => {
            const allPokeList = [];
            response.results.forEach(pokemon => {
              allPokeList.push(pokemon.name);
            });
            this.setState({ allPokeList });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }

  setSessionStorage = (isLogged, token, currentUser) => {
    sessionStorage.setItem('isLogged', isLogged ? 'true' : 'false');
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('currentUser', currentUser);
  };

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
      .catch(error => {
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

  getCatches = token => {
    let t = this.state.token;
    if (token) {
      t = token;
    }
    const fetchObject = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', token: t }
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
        'Content-Type': 'application/json',
        token: this.state.token
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
        'Content-Type': 'application/json',
        token: this.state.token
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
      headers: {
        'Content-Type': 'application/json',
        token: this.state.token
      }
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

  register = user => {
    const registerObject = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch('/auth/register', registerObject)
      .then(response => {
        if (response.ok) {
          alert('Register successful');
        }
        if (response.status === 409) {
          alert('Username already in use');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  login = user => {
    const loginObject = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch('/auth/login', loginObject)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              this.setState({
                isLogged: true,
                token: data.token,
                currentUser: user.username
              });
              this.setSessionStorage(true, data.token, user.username);

              this.getCatches();
              this.pokedex
                .getPokemonsList()
                .then(response => {
                  const allPokeList = [];
                  response.results.forEach(pokemon => {
                    allPokeList.push(pokemon.name);
                  });
                  this.setState({ allPokeList });
                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          alert('Login failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  logout = () => {
    const logoutObject = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        token: this.state.token
      }
    };

    fetch('/auth/logout', logoutObject)
      .then(() => {
        this.setState({
          isLogged: false,
          token: '',
          currentUser: ''
        });
        this.setSessionStorage(false, '', '');
      })
      .catch(error => {
        console.error(error);
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
          allPokeList={this.state.allPokeList}
          register={this.register}
          login={this.login}
          logout={this.logout}
          isLogged={this.state.isLogged}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default App;
