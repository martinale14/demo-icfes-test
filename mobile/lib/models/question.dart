class Question {
  final String id;
  final int order;
  final int totalQuestions;
  final String skillCode;
  final String enunciado;
  final String optionA;
  final String optionB;
  final String optionC;
  final String optionD;
  final int difficulty;

  Question({
    required this.id,
    required this.order,
    required this.totalQuestions,
    required this.skillCode,
    required this.enunciado,
    required this.optionA,
    required this.optionB,
    required this.optionC,
    required this.optionD,
    required this.difficulty,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'] as String,
      order: json['order'] as int,
      totalQuestions: json['totalQuestions'] as int,
      skillCode: json['skillCode'] as String,
      enunciado: json['enunciado'] as String,
      optionA: json['optionA'] as String,
      optionB: json['optionB'] as String,
      optionC: json['optionC'] as String,
      optionD: json['optionD'] as String,
      difficulty: json['difficulty'] as int,
    );
  }

  Map<String, String> get optionsByLetter => {
    'A': optionA,
    'B': optionB,
    'C': optionC,
    'D': optionD,
  };
}
