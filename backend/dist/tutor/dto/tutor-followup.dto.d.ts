import { TutorResponse } from '../schemas/tutor-response.schema.js';
export declare class TutorFollowupDto {
    studentId: string;
    questionId: string;
    studentAnswer: string;
    hintCount: number;
    followUpMessage: string;
    priorTurn: TutorResponse;
}
