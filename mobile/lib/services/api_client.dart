import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/question.dart';
import '../models/attempt_result.dart';
import '../models/tutor_turn.dart';
import '../models/skill_progress.dart';
import '../models/career_affinity.dart';

class ApiClient {
  final http.Client _client = http.Client();

  Future<Question?> getNextQuestion(String studentId) async {
    final uri = Uri.parse(
      '${ApiConfig.baseUrl}/questions/next',
    ).replace(queryParameters: {'studentId': studentId});
    final response = await _client.get(uri);
    _ensureOk(response);
    if (response.body == 'null' || response.body.isEmpty) return null;
    return Question.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  }

  Future<AttemptResult> submitAttempt({
    required String studentId,
    required String questionId,
    required String selectedOption,
    required int hintCount,
  }) async {
    final uri = Uri.parse('${ApiConfig.baseUrl}/attempts');
    final response = await _client.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'studentId': studentId,
        'questionId': questionId,
        'selectedOption': selectedOption,
        'hintCount': hintCount,
      }),
    );
    _ensureOk(response);
    return AttemptResult.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  }

  Future<TutorTurn> submitFollowup({
    required String studentId,
    required String questionId,
    required String studentAnswer,
    required int hintCount,
    required String followUpMessage,
    required TutorTurn priorTurn,
  }) async {
    final uri = Uri.parse('${ApiConfig.baseUrl}/tutor/followup');
    final response = await _client.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'studentId': studentId,
        'questionId': questionId,
        'studentAnswer': studentAnswer,
        'hintCount': hintCount,
        'followUpMessage': followUpMessage,
        'priorTurn': priorTurn.toJson(),
      }),
    );
    _ensureOk(response);
    return TutorTurn.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
  }

  Future<List<SkillProgress>> getProgress(String studentId) async {
    final uri = Uri.parse(
      '${ApiConfig.baseUrl}/progress',
    ).replace(queryParameters: {'studentId': studentId});
    final response = await _client.get(uri);
    _ensureOk(response);
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    final skills = (body['skills'] as List)
        .map((s) => SkillProgress.fromJson(s as Map<String, dynamic>))
        .toList();
    return skills;
  }

  Future<String?> getHint({required String skillCode, required int hintNumber}) async {
    final uri = Uri.parse('${ApiConfig.baseUrl}/knowledge-base/hint').replace(
      queryParameters: {'skillCode': skillCode, 'hintNumber': '$hintNumber'},
    );
    final response = await _client.get(uri);
    _ensureOk(response);
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    return body['hint'] as String?;
  }

  Future<List<CareerAffinity>> getCareerAffinity(String studentId) async {
    final uri = Uri.parse(
      '${ApiConfig.baseUrl}/careers/affinity',
    ).replace(queryParameters: {'studentId': studentId});
    final response = await _client.get(uri);
    _ensureOk(response);
    final body = jsonDecode(response.body) as List;
    return body.map((c) => CareerAffinity.fromJson(c as Map<String, dynamic>)).toList();
  }

  void _ensureOk(http.Response response) {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        'Error del servidor (${response.statusCode}): ${response.body}',
      );
    }
  }
}

class ApiException implements Exception {
  final String message;
  ApiException(this.message);

  @override
  String toString() => message;
}
