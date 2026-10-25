import { TutorResponse } from './schemas/tutor-response.schema.js';
export interface TutorContext {
    subject: string;
    skill: string;
    learningGoal: string;
    studentMastery: number;
    currentQuestion: {
        enunciado: string;
        difficulty: number;
        correctAnswer: string;
        explanation: string;
    };
    studentAnswer: string;
    hintCount: number;
    tutorMode: 'initial_feedback' | 'followup';
    ragSnippets: string[];
}
export declare class TutorService {
    private readonly logger;
    private readonly client;
    private readonly model;
    generateInitialFeedback(context: TutorContext): Promise<TutorResponse>;
    followup(context: TutorContext, priorTurn: TutorResponse, followUpMessage: string): Promise<TutorResponse>;
    private callTutor;
}
