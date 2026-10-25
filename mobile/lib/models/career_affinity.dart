class CareerAffinity {
  final String code;
  final String name;
  final String description;
  final int affinityScore;
  final int rank;

  CareerAffinity({
    required this.code,
    required this.name,
    required this.description,
    required this.affinityScore,
    required this.rank,
  });

  factory CareerAffinity.fromJson(Map<String, dynamic> json) {
    return CareerAffinity(
      code: json['code'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      affinityScore: json['affinityScore'] as int,
      rank: json['rank'] as int,
    );
  }
}
