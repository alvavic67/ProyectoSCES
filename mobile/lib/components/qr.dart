import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'signal.dart';
import 'package:mobile/controllers/readQR.dart';

class QR extends StatefulWidget {
  final Firestore firestore;
  final String docId;
  QR({this.firestore, this.docId});
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
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => Signal(
                      firestore: widget.firestore,
                      docId: widget.docId,
                    )),
          );
        },
      ),
    );
  }
}
