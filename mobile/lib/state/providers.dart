import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import '../config/api_config.dart';
import '../models/attempt_result.dart';
import '../models/question.dart';
import '../models/skill_progress.dart';
import '../models/career_affinity.dart';
import '../services/api_client.dart';

final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

class QuizState {
  final Question? question;
  final List<String> hints;
  final bool requestingHint;
  final bool noMoreHints;
  final bool loading;
  final String? error;
  final bool completed;

  QuizState({
    this.question,
    this.hints = const [],
    this.requestingHint = false,
    this.noMoreHints = false,
    this.loading = false,
    this.error,
    this.completed = false,
  });

  int get hintCount => hints.length;

  QuizState copyWith({
    Question? question,
    List<String>? hints,
    bool? requestingHint,
    bool? noMoreHints,
    bool? loading,
    String? error,
    bool? completed,
  }) {
    return QuizState(
      question: question ?? this.question,
      hints: hints ?? this.hints,
      requestingHint: requestingHint ?? this.requestingHint,
      noMoreHints: noMoreHints ?? this.noMoreHints,
      loading: loading ?? this.loading,
      error: error,
      completed: completed ?? this.completed,
    );
  }
}

class QuizNotifier extends Notifier<QuizState> {
  @override
  QuizState build() => QuizState();

  Future<void> loadNext() async {
    state = state.copyWith(loading: true, error: null);
    try {
      final question = await ref
          .read(apiClientProvider)
          .getNextQuestion(ApiConfig.demoStudentId);
      state = question == null ? QuizState(completed: true) : QuizState(question: question);
    } catch (e) {
      state = state.copyWith(loading: false, error: e.toString());
    }
  }

  /// Advances using a question already returned by the last attempt's
  /// response, avoiding a redundant round-trip to GET /questions/next.
  void advanceTo(Question? next) {
    state = next == null ? QuizState(completed: true) : QuizState(question: next);
  }

  /// Reveals the next RAG snippet for the current question's skill as a
  /// student-facing hint (still counts toward the mastery hint penalty).
  Future<void> requestHint() async {
    final question = state.question;
    if (question == null || state.requestingHint || state.noMoreHints) return;
    state = state.copyWith(requestingHint: true);
    try {
      final hint = await ref
          .read(apiClientProvider)
          .getHint(skillCode: question.skillCode, hintNumber: state.hints.length + 1);
      state = hint == null
          ? state.copyWith(requestingHint: false, noMoreHints: true)
          : state.copyWith(hints: [...state.hints, hint], requestingHint: false);
    } catch (_) {
      state = state.copyWith(requestingHint: false);
      rethrow;
    }
  }
}

final quizProvider = NotifierProvider<QuizNotifier, QuizState>(QuizNotifier.new);

/// Holds the context of the last graded attempt so the chat/feedback screen
/// and the follow-up call can be built without re-fetching anything.
class LastAttemptContext {
  final String questionId;
  final String studentAnswer;
  final int hintCount;
  final AttemptResult result;

  LastAttemptContext({
    required this.questionId,
    required this.studentAnswer,
    required this.hintCount,
    required this.result,
  });
}

final lastAttemptProvider = StateProvider<LastAttemptContext?>((ref) => null);

final progressProvider = FutureProvider<List<SkillProgress>>((ref) async {
  return ref.read(apiClientProvider).getProgress(ApiConfig.demoStudentId);
});

final careerAffinityProvider = FutureProvider<List<CareerAffinity>>((ref) async {
  return ref.read(apiClientProvider).getCareerAffinity(ApiConfig.demoStudentId);
});
