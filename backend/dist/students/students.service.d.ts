import { PrismaService } from '../prisma/prisma.service.js';
export declare const DEMO_STUDENT_ID = "demo-student";
export declare class StudentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(studentId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    resetProgress(studentId: string): Promise<{
        reset: boolean;
    }>;
}
