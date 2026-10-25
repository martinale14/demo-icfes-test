import 'package:flutter/material.dart';

class ChatBubble extends StatelessWidget {
  final String text;
  final bool fromTutor;

  const ChatBubble({super.key, required this.text, this.fromTutor = true});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final alignment = fromTutor ? Alignment.centerLeft : Alignment.centerRight;
    final color = fromTutor
        ? theme.colorScheme.surfaceContainerHighest
        : theme.colorScheme.primaryContainer;

    return Align(
      alignment: alignment,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(text, style: theme.textTheme.bodyMedium),
      ),
    );
  }
}
