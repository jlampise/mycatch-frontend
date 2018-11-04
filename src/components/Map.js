import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import Icons from '../icons';
import './Map.css';

const HERE = [60.21172186425134, 24.817264974117283];

export default class Map extends Component {
  handleClick = e => {
    this.props.pickNewLocation(e.latlng.lat, e.latlng.lng);
  };

  handleMarkerClick = e => {
    this.props.pickOldCatch(e.target.options.id);
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
            icon={Icons.pokeIcon(c.pokemon)}
            key={c._id}
            id={c._id}
            opacity={
              this.props.pickedCatch && this.props.pickedCatch._id === c._id
                ? 1.0
                : 0.6
            }
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
