import 'dart:async';

import 'package:flutter/material.dart';
import 'qr.dart';

import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:geolocator/geolocator.dart';

class Signal extends StatefulWidget {
  final Firestore firestore;
  final String docId;

  Signal({this.firestore, this.docId});
  @override
  _SignalState createState() => _SignalState();
}

class _SignalState extends State<Signal> {
  CollectionReference _usuariosRef;
  String latitude;
  String longitude;
  StreamSubscription<Position> positionStream;
  Map<String, dynamic> actualUser;

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
        _usuariosRef.document(widget.docId).updateData({
          'coordinates':
              GeoPoint(double.parse(latitude), double.parse(longitude))
        });
      }
    });

    // List<Timestamp> entradasActuales = widget.entradas;
    // entradasActuales.add(Timestamp.now());
    // print(entradasActuales);
    (() async {
      actualUser = await widget.firestore
          .collection('usuarios')
          .document(widget.docId)
          .get()
          .then((snapshot) => snapshot.data);

      var _entradas =
          new List<Timestamp>.from(actualUser['_entrada'].cast<Timestamp>());
      _entradas.add(Timestamp.now());

      print(_entradas);
      await widget.firestore
          .collection('usuarios')
          .document(widget.docId)
          .updateData({'_entrada': _entradas, 'activo': true});
    })();
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
              onPressed: () async {
                positionStream.pause();

                var _salidas = new List<Timestamp>.from(
                    actualUser['_salida'].cast<Timestamp>());
                _salidas.add(Timestamp.now());

                print(_salidas);
                await widget.firestore
                    .collection('usuarios')
                    .document(widget.docId)
                    .updateData({'_salida': _salidas, 'activo': false});

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
