import 'question.dart';
import 'tutor_turn.dart';

class AttemptResult {
  final String attemptId;
  final bool isCorrect;
  final String correctAnswer;
  final String explanation;
  final double masteryProbability;
  final String skillCode;
  final TutorTurn tutor;
  final Question? nextQuestion;

  AttemptResult({
    required this.attemptId,
    required this.isCorrect,
    required this.correctAnswer,
    required this.explanation,
    required this.masteryProbability,
    required this.skillCode,
    required this.tutor,
    required this.nextQuestion,
  });

  factory AttemptResult.fromJson(Map<String, dynamic> json) {
    return AttemptResult(
      attemptId: json['attemptId'] as String,
      isCorrect: json['isCorrect'] as bool,
      correctAnswer: json['correctAnswer'] as String,
      explanation: json['explanation'] as String,
      masteryProbability: (json['masteryProbability'] as num).toDouble(),
      skillCode: json['skillCode'] as String,
      tutor: TutorTurn.fromJson(json['tutor'] as Map<String, dynamic>),
      nextQuestion: json['nextQuestion'] == null
          ? null
          : Question.fromJson(json['nextQuestion'] as Map<String, dynamic>),
    );
  }
}
