import { ProgressService } from './progress.service.js';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    getProgress(studentId: string): Promise<{
        skills: any;
    }>;
}
