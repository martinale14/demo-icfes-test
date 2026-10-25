import { PrismaService } from '../prisma/prisma.service.js';
export declare class ProgressService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProgress(studentId: string): Promise<{
        skills: {
            skillCode: string;
            skillName: string;
            masteryProbability: number;
            consecutiveSuccesses: number;
            attempts: number;
        }[];
    }>;
}
