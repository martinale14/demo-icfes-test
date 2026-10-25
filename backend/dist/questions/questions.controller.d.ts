import { QuestionsService } from './questions.service.js';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getNext(studentId: string): Promise<import("./dto/question-public.dto.js").QuestionPublicDto | null>;
}
