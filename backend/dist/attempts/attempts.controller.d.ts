import { AttemptsService } from './attempts.service.js';
import { CreateAttemptDto } from './dto/create-attempt.dto.js';
export declare class AttemptsController {
    private readonly attemptsService;
    constructor(attemptsService: AttemptsService);
    submit(dto: CreateAttemptDto): Promise<import("./dto/attempt-response.dto.js").AttemptResponseDto>;
}
