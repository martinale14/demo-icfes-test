import { PrismaService } from '../prisma/prisma.service.js';
export declare const INITIAL_MASTERY = 0.3;
export declare class MasteryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    computeAttemptScore(isCorrect: boolean, difficulty: number, hintCount: number): number;
    computeNewMastery(oldMastery: number, performanceScore: number): number;
    getCurrentMastery(studentId: string, skillId: string): Promise<number>;
    updateForAttempt(params: {
        studentId: string;
        skillId: string;
        isCorrect: boolean;
        difficulty: number;
        hintCount: number;
    }): Promise<any>;
}
