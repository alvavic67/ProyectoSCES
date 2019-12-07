import 'dart:io';
import 'package:firebase_ml_vision/firebase_ml_vision.dart';

class ScanQR {
  void readQR(File imageFile) async {
    final FirebaseVisionImage visionImage =
        FirebaseVisionImage.fromFile(imageFile);
    final BarcodeDetector barcodeDetector =
        FirebaseVision.instance.barcodeDetector();
    final List<Barcode> barcodes =
        await barcodeDetector.detectInImage(visionImage);

    for (Barcode barcode in barcodes) {
      final BarcodeValueType valueType = barcode.valueType;

      switch (valueType) {
        case BarcodeValueType.wifi:
          final String ssid = barcode.wifi.ssid;
          final String password = barcode.wifi.password;
          final BarcodeWiFiEncryptionType type = barcode.wifi.encryptionType;
          print(ssid);
          print(password);
          print(type);
          break;
        case BarcodeValueType.url:
          final String title = barcode.url.title;
          final String url = barcode.url.url;
          print(title);
          print(url);
          break;
        case BarcodeValueType.unknown:
          break;
        case BarcodeValueType.contactInfo:
          break;
        case BarcodeValueType.email:
          break;
        case BarcodeValueType.isbn:
          break;
        case BarcodeValueType.phone:
          break;
        case BarcodeValueType.product:
          break;
        case BarcodeValueType.sms:
          break;
        case BarcodeValueType.text:
          break;
        case BarcodeValueType.geographicCoordinates:
          break;
        case BarcodeValueType.calendarEvent:
          break;
        case BarcodeValueType.driverLicense:
          break;
      }
    }
  }
}
