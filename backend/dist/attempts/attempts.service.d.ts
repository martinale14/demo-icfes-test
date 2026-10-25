import { PrismaService } from '../prisma/prisma.service.js';
import { QuestionsService } from '../questions/questions.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { TutorService } from '../tutor/tutor.service.js';
import { TutorContextBuilderService } from '../tutor/tutor-context-builder.service.js';
import { CreateAttemptDto } from './dto/create-attempt.dto.js';
import { AttemptResponseDto } from './dto/attempt-response.dto.js';
export declare class AttemptsService {
    private readonly prisma;
    private readonly questionsService;
    private readonly masteryService;
    private readonly tutorService;
    private readonly contextBuilder;
    constructor(prisma: PrismaService, questionsService: QuestionsService, masteryService: MasteryService, tutorService: TutorService, contextBuilder: TutorContextBuilderService);
    submit(dto: CreateAttemptDto): Promise<AttemptResponseDto>;
}
