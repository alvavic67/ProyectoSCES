import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'signal.dart';
import 'package:mobile/controllers/readQR.dart';
import 'package:firebase_core/firebase_core.dart';

class QR extends StatefulWidget {
  @override
  _QRState createState() => _QRState();
}

class _QRState extends State<QR> {
  void readQR() async {
    final imageFile = await ImagePicker.pickImage(
      source: ImageSource.camera,
    );

    ScanQR().readQR(imageFile);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Scan QR'),
        actions: <Widget>[
          MaterialButton(
            child: Icon(
              Icons.exit_to_app,
              color: Colors.white,
            ),
            onPressed: () {
              print('Navigate to login');
            },
          ),
        ],
      ),
      body: Center(
        child: Text('QR'),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(
          Icons.camera,
          color: Colors.white,
        ),
        onPressed: () async {
          final FirebaseApp app = await FirebaseApp.configure(
            name: 'SCES',
            options: const FirebaseOptions(
              googleAppID: '1:941504175591:android:a8a51cbc8b2e03f640b142',
              gcmSenderID: '715582567067',
              apiKey: 'AIzaSyCidy5U6JSR159IaN90AmC0mFNyIZf61fY',
              projectID: 'sces-4c69c',
            ),
          );
          final Firestore firestore = Firestore(app: app);
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => Signal(
                      firestore: firestore,
                    )),
          );
        },
      ),
    );
  }
}
