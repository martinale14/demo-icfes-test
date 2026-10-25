import { KnowledgeBaseService } from './knowledge-base.service.js';
export declare class KnowledgeBaseController {
    private readonly knowledgeBaseService;
    constructor(knowledgeBaseService: KnowledgeBaseService);
    getHint(skillCode: string, hintNumber: string): {
        hint: string | null;
    };
}
