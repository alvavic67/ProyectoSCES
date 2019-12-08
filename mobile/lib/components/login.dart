import 'package:flutter/material.dart';
import 'qr.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Login extends StatefulWidget {
  final Firestore firestore;
  Login({this.firestore});
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _controllerUser = TextEditingController();
  final _controllerPassword = TextEditingController();

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

                var query = widget.firestore
                    .collection('usuarios')
                    .where('usuario', isEqualTo: user)
                    .where('password', isEqualTo: password);

                var response = await query
                    .getDocuments()
                    .then((snapshot) => snapshot.documents);

                print(response[0].documentID);
                var docId = response[0].documentID;

                if (response.length != 0) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => QR(
                        firestore: widget.firestore,
                        docId: docId,
                      ),
                    ),
                  );
                }
              },
            )
          ],
        ),
      ),
    );
  }
}
