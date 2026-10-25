import 'package:flutter/material.dart';
import 'screens/question_screen.dart';

class IcfesTutorApp extends StatelessWidget {
  const IcfesTutorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ICFES Tutor Demo',
      theme: ThemeData(colorSchemeSeed: Colors.indigo, useMaterial3: true),
      home: const QuestionScreen(),
    );
  }
}
