import 'package:flutter/material.dart';
import 'qr.dart';

import 'dart:async';
import 'package:http/http.dart' as http;

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _controllerUser = TextEditingController();
  final _controllerPassword = TextEditingController();

  Future<String> authenticate() async {
    var response = await http.get('http://localhost:3001/api/getListUsers',
        headers: {'Accept': 'application/json'});
    print(response.body);
    return response.body;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Container(
        margin: EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(
              Icons.stars,
              color: Colors.black,
            ),
            // FlareActor("assets/world.flr2d",
            //     alignment: Alignment.center,
            //     fit: BoxFit.contain,
            //     animation: "roll"),
            SizedBox(
              height: 100.0,
            ),
            TextFormField(
              decoration: InputDecoration(hintText: 'Usuario'),
              controller: _controllerUser,
            ),
            SizedBox(
              height: 10.0,
            ),
            TextFormField(
              obscureText: true,
              decoration: InputDecoration(hintText: 'Password'),
              controller: _controllerPassword,
            ),
            SizedBox(
              height: 10.0,
            ),
            MaterialButton(
              child: Text(
                'Iniciar Sesion',
                style: TextStyle(color: Colors.white),
              ),
              color: Colors.lightBlue,
              onPressed: () async {
                var user = _controllerUser.text;
                var password = _controllerPassword.text;

                print('Usuario:$user');
                print('Password:$password');

                // print(await authenticate());

                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => QR()),
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
