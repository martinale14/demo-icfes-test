import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/api_config.dart';
import '../state/providers.dart';
import '../widgets/option_button.dart';
import 'chat_feedback_screen.dart';
import 'progress_screen.dart';

class QuestionScreen extends ConsumerStatefulWidget {
  const QuestionScreen({super.key});

  @override
  ConsumerState<QuestionScreen> createState() => _QuestionScreenState();
}

class _QuestionScreenState extends ConsumerState<QuestionScreen> {
  String? _selected;
  bool _submitting = false;

  @override
  void initState() {
    super.initState();
    Future.microtask(() => ref.read(quizProvider.notifier).loadNext());
  }

  Future<void> _submit() async {
    final quiz = ref.read(quizProvider);
    final question = quiz.question;
    if (question == null || _selected == null) return;

    setState(() => _submitting = true);
    try {
      final result = await ref
          .read(apiClientProvider)
          .submitAttempt(
            studentId: ApiConfig.demoStudentId,
            questionId: question.id,
            selectedOption: _selected!,
            hintCount: quiz.hintCount,
          );
      ref.read(lastAttemptProvider.notifier).state = LastAttemptContext(
        questionId: question.id,
        studentAnswer: _selected!,
        hintCount: quiz.hintCount,
        result: result,
      );
      if (!mounted) return;
      setState(() {
        _selected = null;
        _submitting = false;
      });
      await Navigator.of(
        context,
      ).push(MaterialPageRoute(builder: (_) => const ChatFeedbackScreen()));
    } catch (e) {
      if (!mounted) return;
      setState(() => _submitting = false);
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error enviando la respuesta: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final quiz = ref.watch(quizProvider);

    if (quiz.completed) {
      return const ProgressScreen();
    }

    return Scaffold(
      appBar: AppBar(title: const Text('ICFES Tutor — Demo')),
      body: quiz.error != null
          ? Center(child: Text('Error: ${quiz.error}'))
          : quiz.loading || quiz.question == null
          ? const Center(child: CircularProgressIndicator())
          : _buildQuestion(context, quiz),
    );
  }

  Widget _buildQuestion(BuildContext context, QuizState quiz) {
    final question = quiz.question!;
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Pregunta ${question.order} de ${question.totalQuestions}',
            style: theme.textTheme.labelLarge,
          ),
          const SizedBox(height: 8),
          Text(question.enunciado, style: theme.textTheme.titleMedium),
          if (quiz.hints.isNotEmpty) ...[
            const SizedBox(height: 12),
            ...quiz.hints.asMap().entries.map(
              (entry) => Container(
                margin: const EdgeInsets.only(bottom: 6),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: theme.colorScheme.secondaryContainer,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'Pista ${entry.key + 1}: ${entry.value}',
                  style: theme.textTheme.bodySmall,
                ),
              ),
            ),
          ],
          const SizedBox(height: 16),
          Expanded(
            child: ListView(
              children: question.optionsByLetter.entries
                  .map(
                    (entry) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: OptionButton(
                        letter: entry.key,
                        text: entry.value,
                        selected: _selected == entry.key,
                        onTap: _submitting ? null : () => setState(() => _selected = entry.key),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
          Row(
            children: [
              TextButton.icon(
                onPressed: (_submitting || quiz.requestingHint || quiz.noMoreHints)
                    ? null
                    : () async {
                        try {
                          await ref.read(quizProvider.notifier).requestHint();
                          if (!context.mounted) return;
                          if (ref.read(quizProvider).noMoreHints) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('No hay más pistas para esta pregunta.')),
                            );
                          }
                        } catch (e) {
                          if (!context.mounted) return;
                          ScaffoldMessenger.of(
                            context,
                          ).showSnackBar(SnackBar(content: Text('Error pidiendo la pista: $e')));
                        }
                      },
                icon: quiz.requestingHint
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.lightbulb_outline),
                label: Text('Pedir pista (${quiz.hintCount})'),
              ),
              const Spacer(),
              FilledButton(
                onPressed: (_selected == null || _submitting) ? null : _submit,
                child: _submitting
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Responder'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
