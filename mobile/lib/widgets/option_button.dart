import 'package:flutter/material.dart';

class OptionButton extends StatelessWidget {
  final String letter;
  final String text;
  final bool selected;
  final VoidCallback? onTap;

  const OptionButton({
    super.key,
    required this.letter,
    required this.text,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      elevation: selected ? 3 : 0,
      color: selected ? theme.colorScheme.primaryContainer : null,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: selected ? theme.colorScheme.primary : theme.colorScheme.outlineVariant,
        ),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              CircleAvatar(
                radius: 14,
                backgroundColor: selected ? theme.colorScheme.primary : theme.colorScheme.surfaceContainerHighest,
                child: Text(
                  letter,
                  style: TextStyle(
                    color: selected ? theme.colorScheme.onPrimary : theme.colorScheme.onSurface,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(child: Text(text, style: theme.textTheme.bodyLarge)),
            ],
          ),
        ),
      ),
    );
  }
}
