import { TutorResponseSchema } from './tutor-response.schema.js';

describe('TutorResponseSchema', () => {
  it('accepts a well-formed tutor response', () => {
    const result = TutorResponseSchema.safeParse({
      feedback: 'Buen intento, revisemos el concepto.',
      suspectedMisconception: 'Posible confusión con el orden de las operaciones.',
      recommendedAction: 'offer_hint',
      confidence: 0.6,
    });
    expect(result.success).toBe(true);
  });

  it('rejects a payload whose feedback exceeds the length cap', () => {
    const result = TutorResponseSchema.safeParse({
      feedback: 'x'.repeat(901),
      suspectedMisconception: null,
      recommendedAction: 'advance',
      confidence: 0.5,
    });
    expect(result.success).toBe(false);
  });

  it('rejects an unknown recommendedAction value', () => {
    const result = TutorResponseSchema.safeParse({
      feedback: 'Feedback corto.',
      suspectedMisconception: null,
      recommendedAction: 'give_up', // not in the enum
      confidence: 0.5,
    });
    expect(result.success).toBe(false);
  });

  it('rejects a confidence value outside [0, 1]', () => {
    const result = TutorResponseSchema.safeParse({
      feedback: 'Feedback corto.',
      suspectedMisconception: null,
      recommendedAction: 'advance',
      confidence: 1.5,
    });
    expect(result.success).toBe(false);
  });
});
