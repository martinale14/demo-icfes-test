import 'dart:io' show Platform;

class ApiConfig {
  static const String demoStudentId = 'demo-student';

  /// 10.0.2.2 is the Android emulator's alias for the host machine's localhost;
  /// the iOS simulator can reach the host directly via localhost.
  static String get baseUrl {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3001';
    }
    return 'http://localhost:3001';
  }
}
