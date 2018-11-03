import React, { Component } from 'react';
import { Circle, Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';

import './Map.css';

const HERE = {
  lat: 60.21172186425134,
  lng: 24.817264974117283
};

const center = [HERE.lat, HERE.lng];

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng: HERE
    };
  }

  handleClick = e => {
    this.setState({ latlng: { lat: e.latlng.lat, lng: e.latlng.lng } });
    this.props.pickNewLocation(e.latlng.lat, e.latlng.lng);
  };

  handleMarkerClick = e => {
    this.props.pickOldCatch(e.target.options.id);
  };

  render() {
    return (
      <LeafletMap
        id="leaflet-map"
        center={center}
        zoom={13}
        onClick={this.handleClick}
      >
        {this.props.catches.map(c => (
          <Marker
            key={c._id}
            id={c._id}
            opacity={0.7}
            position={[c.lat, c.lng]}
            onClick={this.handleMarkerClick}
          />
        ))}
        {this.props.pickedLocation ? (
          <Marker
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
        <Circle center={center} fillColor="blue" radius={400} />
      </LeafletMap>
    );
  }
}
