import { PrismaService } from '../prisma/prisma.service.js';
import { CareerAffinityDto } from './dto/career-affinity.dto.js';
export declare class CareersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    computeAffinities(studentId: string): Promise<CareerAffinityDto[]>;
}
