import { PrismaService } from '../prisma/prisma.service.js';
export declare class ProgressService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProgress(studentId: string): Promise<{
        skills: any;
    }>;
}
