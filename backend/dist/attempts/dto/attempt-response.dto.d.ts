import { TutorResponse } from '../../tutor/schemas/tutor-response.schema.js';
import { QuestionPublicDto } from '../../questions/dto/question-public.dto.js';
export declare class AttemptResponseDto {
    attemptId: string;
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
    masteryProbability: number;
    skillCode: string;
    tutor: TutorResponse;
    nextQuestion: QuestionPublicDto | null;
}
