import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/career_affinity.dart';
import '../state/providers.dart';

class CareerAffinityScreen extends ConsumerWidget {
  const CareerAffinityScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final affinities = ref.watch(careerAffinityProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Afinidad vocacional')),
      body: affinities.when(
        data: (careers) => ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: careers.length + 1,
          itemBuilder: (context, index) {
            if (index == 0) {
              return Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Text(
                  'Según tu desempeño en las 5 áreas evaluadas, estas son las carreras con '
                  'mayor afinidad. Es un cálculo orientativo, no un resultado oficial.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              );
            }
            final career = careers[index - 1];
            return _CareerCard(career: career);
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('Error cargando afinidad vocacional: $err')),
      ),
    );
  }
}

class _CareerCard extends StatelessWidget {
  final CareerAffinity career;

  const _CareerCard({required this.career});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isTopThree = career.rank <= 3;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: isTopThree ? 2 : 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: isTopThree ? theme.colorScheme.primary : theme.colorScheme.outlineVariant,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: isTopThree
                  ? theme.colorScheme.primary
                  : theme.colorScheme.surfaceContainerHighest,
              child: Text(
                '#${career.rank}',
                style: TextStyle(
                  color: isTopThree ? theme.colorScheme.onPrimary : theme.colorScheme.onSurface,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          career.name,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      Text(
                        '${career.affinityScore}%',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: career.affinityScore / 100,
                      minHeight: 8,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(career.description, style: theme.textTheme.bodySmall),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
