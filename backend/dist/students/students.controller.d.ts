import { StudentsService } from './students.service.js';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getMe(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    reset(id: string): Promise<{
        reset: boolean;
    }>;
}
