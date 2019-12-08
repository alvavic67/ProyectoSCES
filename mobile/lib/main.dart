import 'package:flutter/material.dart';
import 'components/login.dart';

import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
  runApp(MyApp(
    firestore: firestore,
  ));
}

class MyApp extends StatelessWidget {
  final Firestore firestore;
  MyApp({this.firestore});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      debugShowCheckedModeBanner: false,
      home: Login(
        firestore: firestore,
      ),
    );
  }
}
