import { CareersService } from './careers.service.js';
export declare class CareersController {
    private readonly careersService;
    constructor(careersService: CareersService);
    getAffinity(studentId: string): Promise<import("./dto/career-affinity.dto.js").CareerAffinityDto[]>;
}
