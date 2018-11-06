import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import Icons from '../icons';

const HERE = [60.21172186425134, 24.817264974117283];

export default class Map extends Component {
  handleClick = e => {
    this.props.pickNewLocation(e.latlng.lat, e.latlng.lng);
  };

  handleMarkerClick = e => {
    this.props.pickOldCatch(e.target.options.id);
  };

  getIconOpacity = pokeCatch => {
    if (
      this.props.pickedCatch &&
      this.props.pickedCatch._id === pokeCatch._id
    ) {
      return 1.0;
    } else if (pokeCatch.creator === this.props.currentUser) {
      return 1.0;
    } else {
      return 1.0;
    }
  };

  getIconSize = pokeCatch => {
    if (
      this.props.pickedCatch &&
      this.props.pickedCatch._id === pokeCatch._id
    ) {
      return 110;
    } else if (pokeCatch.creator === this.props.currentUser) {
      return 70;
    } else {
      return 50;
    }
  };

  render() {
    return (
      <LeafletMap
        id="leaflet-map"
        center={HERE}
        zoom={13}
        onClick={this.handleClick}
      >
        {this.props.catches.map(c => (
          <Marker
            icon={Icons.pokeIcon(c.pokemon, this.getIconSize(c))}
            key={c._id}
            id={c._id}
            opacity={this.getIconOpacity(c)}
            position={[c.lat, c.lng]}
            onClick={this.handleMarkerClick}
          />
        ))}
        {this.props.pickedLocation ? (
          <Marker
            icon={Icons.locationIcon}
            position={[
              this.props.pickedLocation.lat,
              this.props.pickedLocation.lng
            ]}
          />
        ) : null}
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    );
  }
}
