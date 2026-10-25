class TutorTurn {
  final String feedback;
  final String? suspectedMisconception;
  final String recommendedAction;
  final double confidence;

  TutorTurn({
    required this.feedback,
    required this.suspectedMisconception,
    required this.recommendedAction,
    required this.confidence,
  });

  factory TutorTurn.fromJson(Map<String, dynamic> json) {
    return TutorTurn(
      feedback: json['feedback'] as String,
      suspectedMisconception: json['suspectedMisconception'] as String?,
      recommendedAction: json['recommendedAction'] as String,
      confidence: (json['confidence'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
    'feedback': feedback,
    'suspectedMisconception': suspectedMisconception,
    'recommendedAction': recommendedAction,
    'confidence': confidence,
  };
}
