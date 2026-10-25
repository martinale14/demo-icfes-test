import { PrismaService } from '../prisma/prisma.service.js';
export declare class SkillsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(skillId: string): Promise<{
        id: string;
        name: string;
        code: string;
        description: string;
    }>;
    getAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        code: string;
        description: string;
    }[]>;
}
