import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { config } from "../config/config";

import axios from "axios";

class MapContainer extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/getLocations").then(async data => {
      const users = await data.json();
      this.setState({ locations: users.data });
    });
  }

  render() {
    const mapStyles = {
      width: "50%",
      height: "50%"
    };
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 21.1761818, lng: -101.6726867 }}
      >
        {/* <Marker position={{ lat: 48.0, lng: -122.0 }} /> */}
        {this.state.locations.map(location => (
          <Marker
            position={{
              lat: location.coordinates.lat,
              lng: location.coordinates.lng
            }}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.googlemapskey
})(MapContainer);
