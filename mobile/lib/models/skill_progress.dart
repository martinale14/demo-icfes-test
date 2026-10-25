class SkillProgress {
  final String skillCode;
  final String skillName;
  final double masteryProbability;
  final int consecutiveSuccesses;
  final int attempts;

  SkillProgress({
    required this.skillCode,
    required this.skillName,
    required this.masteryProbability,
    required this.consecutiveSuccesses,
    required this.attempts,
  });

  factory SkillProgress.fromJson(Map<String, dynamic> json) {
    return SkillProgress(
      skillCode: json['skillCode'] as String,
      skillName: json['skillName'] as String,
      masteryProbability: (json['masteryProbability'] as num).toDouble(),
      consecutiveSuccesses: json['consecutiveSuccesses'] as int,
      attempts: json['attempts'] as int,
    );
  }
}
