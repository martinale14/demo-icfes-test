import { PrismaService } from '../prisma/prisma.service.js';
export declare class SkillsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(skillId: string): Promise<any>;
    getAll(): any;
}
