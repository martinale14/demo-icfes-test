import { PrismaService } from '../prisma/prisma.service.js';
import { QuestionPublicDto } from './dto/question-public.dto.js';
export declare class QuestionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getNextQuestion(studentId: string): Promise<QuestionPublicDto | null>;
    getByIdWithAnswer(questionId: string): Promise<{
        skill: {
            id: string;
            name: string;
            code: string;
            description: string;
        };
    } & {
        id: string;
        skillId: string;
        difficulty: number;
        order: number;
        enunciado: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctAnswer: string;
        explanation: string;
    }>;
    private toPublicDto;
}
