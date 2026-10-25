import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/api_config.dart';
import '../state/providers.dart';
import '../widgets/chat_bubble.dart';

class _ChatMessage {
  final String text;
  final bool fromTutor;
  _ChatMessage({required this.text, required this.fromTutor});
}

class ChatFeedbackScreen extends ConsumerStatefulWidget {
  const ChatFeedbackScreen({super.key});

  @override
  ConsumerState<ChatFeedbackScreen> createState() => _ChatFeedbackScreenState();
}

class _ChatFeedbackScreenState extends ConsumerState<ChatFeedbackScreen> {
  final _followupController = TextEditingController();
  final List<_ChatMessage> _messages = [];
  bool _followupUsed = false;
  bool _sendingFollowup = false;

  @override
  void initState() {
    super.initState();
    final attempt = ref.read(lastAttemptProvider);
    if (attempt != null) {
      _messages.add(_ChatMessage(text: attempt.result.tutor.feedback, fromTutor: true));
    }
  }

  @override
  void dispose() {
    _followupController.dispose();
    super.dispose();
  }

  Future<void> _sendFollowup() async {
    final attempt = ref.read(lastAttemptProvider);
    final message = _followupController.text.trim();
    if (attempt == null || message.isEmpty) return;

    setState(() {
      _messages.add(_ChatMessage(text: message, fromTutor: false));
      _sendingFollowup = true;
    });
    _followupController.clear();

    try {
      final response = await ref
          .read(apiClientProvider)
          .submitFollowup(
            studentId: ApiConfig.demoStudentId,
            questionId: attempt.questionId,
            studentAnswer: attempt.studentAnswer,
            hintCount: attempt.hintCount,
            followUpMessage: message,
            priorTurn: attempt.result.tutor,
          );
      if (!mounted) return;
      setState(() {
        _messages.add(_ChatMessage(text: response.feedback, fromTutor: true));
        _followupUsed = true;
        _sendingFollowup = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _sendingFollowup = false);
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error en el seguimiento: $e')));
    }
  }

  void _continue() {
    final attempt = ref.read(lastAttemptProvider);
    ref.read(quizProvider.notifier).advanceTo(attempt?.result.nextQuestion);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final attempt = ref.watch(lastAttemptProvider);
    if (attempt == null) {
      return const Scaffold(body: Center(child: Text('No hay un intento reciente.')));
    }
    final result = attempt.result;

    return Scaffold(
      appBar: AppBar(title: Text(result.isCorrect ? '¡Correcto!' : 'Respuesta incorrecta')),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            color: result.isCorrect ? Colors.green.shade100 : Colors.red.shade100,
            padding: const EdgeInsets.all(12),
            child: Text(
              result.isCorrect
                  ? 'Respondiste correctamente.'
                  : 'La respuesta correcta era ${result.correctAnswer}.',
              textAlign: TextAlign.center,
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: _messages
                  .map((m) => ChatBubble(text: m.text, fromTutor: m.fromTutor))
                  .toList(),
            ),
          ),
          if (_sendingFollowup) const LinearProgressIndicator(),
          if (!_followupUsed)
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _followupController,
                      decoration: const InputDecoration(
                        hintText: 'Hazle una pregunta al tutor...',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  IconButton(
                    onPressed: _sendingFollowup ? null : _sendFollowup,
                    icon: const Icon(Icons.send),
                  ),
                ],
              ),
            ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
            child: SizedBox(
              width: double.infinity,
              child: FilledButton(onPressed: _continue, child: const Text('Continuar')),
            ),
          ),
        ],
      ),
    );
  }
}
