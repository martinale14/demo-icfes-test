import { z } from 'zod';
export declare const TutorResponseSchema: z.ZodObject<{
    feedback: z.ZodString;
    suspectedMisconception: z.ZodNullable<z.ZodString>;
    recommendedAction: z.ZodEnum<{
        advance: "advance";
        offer_hint: "offer_hint";
        review_concept: "review_concept";
        ask_clarifying_question: "ask_clarifying_question";
    }>;
    confidence: z.ZodNumber;
}, z.core.$strip>;
export type TutorResponse = z.infer<typeof TutorResponseSchema>;
