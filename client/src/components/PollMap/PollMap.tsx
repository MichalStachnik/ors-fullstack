import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './PollMap.css';

type State = {
  lat: number;
  lng: number;
  zoom: number;
};

interface Props {
  voters: any;
}

type LatLng = {
  lat: number;
  lng: number;
};

export default class PollMap extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 1
    };
  }

  render() {
    const position: LatLng = { lat: this.state.lat, lng: this.state.lng };
    return (
      <Map center={position} zoom={this.state.zoom} className="mt-3">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {this.props.voters.map((voter: any, index: number) => {
          return (
            <Marker position={[voter.lat, voter.lon]} key={index}></Marker>
          );
        })}
        {/* <Popup> </Popup> */}
      </Map>
    );
  }
}
