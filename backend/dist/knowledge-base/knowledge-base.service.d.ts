export declare class KnowledgeBaseService {
    retrieve(skillCode: string, limit?: number): string[];
    getHint(skillCode: string, hintNumber: number): string | null;
}
