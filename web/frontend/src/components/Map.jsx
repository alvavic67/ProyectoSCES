import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import axios from "axios";

import { config, app } from "../config";
import "firebase/firestore";
const db = app.firestore();

class MapContainer extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    // fetch("http://localhost:3001/api/getLocations").then(async data => {
    //   const users = await data.json();
    //   this.setState({ locations: users.data });
    // });
    db.collection("usuarios").onSnapshot(snapshot => {
      var response = snapshot.docs.map(doc => doc.data().coordinates);
      response = response.filter(item => item != undefined);
      console.log(response);
      this.setState({ locations: response });
    });
  }

  componentWillMount() {
    db.collection("usuarios").onSnapshot(snapshot => {
      var response = snapshot.docs.map(doc => doc.data().coordinates);
      response = response.filter(item => item != undefined);
      console.log(response);
      this.setState({ locations: response });
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
        initialCenter={{
          lat: 21.1761819,
          lng: -101.6726867
        }}
      >
        {/* <Marker position={{ lat: 48.0, lng: -122.0 }} /> */}
        {this.state.locations.map(location => (
          <Marker
            position={{
              lat: location._lat,
              lng: location._long
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
