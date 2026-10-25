import { z } from 'zod';
export const TutorResponseSchema = z.object({
    feedback: z.string().min(1).max(900),
    suspectedMisconception: z.string().max(400).nullable(),
    recommendedAction: z.enum(['advance', 'offer_hint', 'review_concept', 'ask_clarifying_question']),
    confidence: z.number().min(0).max(1),
});
//# sourceMappingURL=tutor-response.schema.js.map