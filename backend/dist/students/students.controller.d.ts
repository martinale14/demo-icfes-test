import { StudentsService } from './students.service.js';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getMe(): Promise<any>;
}
