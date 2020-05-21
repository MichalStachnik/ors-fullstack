import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './PollMap.css';

interface Props {
  voters: Voter[];
}

interface Voter {
  lat: number;
  lon: number;
  voterId: string;
  _id: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

const PollMap: React.FC<Props> = (props) => {
  const [mapValues, setMapValues] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 1,
  });

  const position: LatLng = { lat: mapValues.lat, lng: mapValues.lng };

  return (
    <Map center={position} zoom={mapValues.zoom} className="mt-3">
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.voters.map((voter: Voter, index: number) => {
        return <Marker position={[voter.lat, voter.lon]} key={index}></Marker>;
      })}
      {/* <Popup> </Popup> */}
    </Map>
  );
};

export default PollMap;
