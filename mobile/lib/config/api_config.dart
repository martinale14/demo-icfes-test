import 'dart:io' show Platform;

import 'package:flutter/foundation.dart';

class ApiConfig {
  static const String demoStudentId = 'demo-student';

  /// 10.0.2.2 is the Android emulator's alias for the host machine's localhost;
  /// the iOS simulator can reach the host directly via localhost.
  static String get baseUrl {
    if (kIsWeb || Platform.isIOS) {
      return 'http://localhost:3001';
    }
    
    return 'http://10.0.2.2:3001';
  }
}
