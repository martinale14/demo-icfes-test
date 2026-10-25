import { QuestionsService } from '../questions/questions.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { KnowledgeBaseService } from '../knowledge-base/knowledge-base.service.js';
import { TutorContext } from './tutor.service.js';
export declare class TutorContextBuilderService {
    private readonly questionsService;
    private readonly masteryService;
    private readonly knowledgeBaseService;
    constructor(questionsService: QuestionsService, masteryService: MasteryService, knowledgeBaseService: KnowledgeBaseService);
    build(params: {
        studentId: string;
        questionId: string;
        studentAnswer: string;
        hintCount: number;
        tutorMode: 'initial_feedback' | 'followup';
        masteryOverride?: number;
    }): Promise<TutorContext>;
}
