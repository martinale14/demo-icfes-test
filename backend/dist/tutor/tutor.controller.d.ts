import { TutorService } from './tutor.service.js';
import { TutorContextBuilderService } from './tutor-context-builder.service.js';
import { TutorFollowupDto } from './dto/tutor-followup.dto.js';
export declare class TutorController {
    private readonly tutorService;
    private readonly contextBuilder;
    constructor(tutorService: TutorService, contextBuilder: TutorContextBuilderService);
    followup(dto: TutorFollowupDto): Promise<{
        feedback: string;
        suspectedMisconception: string | null;
        recommendedAction: "advance" | "offer_hint" | "review_concept" | "ask_clarifying_question";
        confidence: number;
    }>;
}
