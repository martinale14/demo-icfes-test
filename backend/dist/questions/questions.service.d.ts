import { PrismaService } from '../prisma/prisma.service.js';
import { QuestionPublicDto } from './dto/question-public.dto.js';
export declare class QuestionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getNextQuestion(studentId: string): Promise<QuestionPublicDto | null>;
    getByIdWithAnswer(questionId: string): Promise<any>;
    private toPublicDto;
}
