import 'dart:async';

import 'package:flutter/material.dart';
import 'qr.dart';

import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:geolocator/geolocator.dart';

class Signal extends StatefulWidget {
  final Firestore firestore;
  Signal({this.firestore});
  @override
  _SignalState createState() => _SignalState();
}

class _SignalState extends State<Signal> {
  CollectionReference _usuariosRef;
  String latitude;
  String longitude;
  StreamSubscription<Position> positionStream;

  @override
  void initState() {
    super.initState();

    _usuariosRef = widget.firestore.collection('usuarios');

    var geolocator = Geolocator();
    var locationOptions =
        LocationOptions(accuracy: LocationAccuracy.high, distanceFilter: 10);

    positionStream = geolocator
        .getPositionStream(locationOptions)
        .listen((Position position) {
      print(position == null
          ? 'Unknown'
          : position.latitude.toString() +
              ', ' +
              position.longitude.toString());
      setState(() {
        latitude = position.latitude.toString();
        longitude = position.longitude.toString();
      });

      if (latitude != null && longitude != null) {
        _usuariosRef.document('IUBDedlp0flrHo5OC3jH').updateData({
          'coordinates':
              GeoPoint(double.parse(latitude), double.parse(longitude))
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Emitiendo señal...'),
      ),
      body: Container(
        width: double.infinity,
        margin: EdgeInsets.all(10.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Text('Coordinates: $latitude, $longitude'),
            CircularProgressIndicator(),
            SizedBox(
              height: 60.0,
            ),
            MaterialButton(
              child: Text(
                'Dejar de emitir señal',
                style: TextStyle(color: Colors.white),
              ),
              color: Colors.redAccent,
              // Within the `FirstRoute` widget
              onPressed: () {
                positionStream.pause();
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => QR()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
