import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QuestionsService } from '../questions/questions.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { TutorService } from '../tutor/tutor.service.js';
import { TutorContextBuilderService } from '../tutor/tutor-context-builder.service.js';
import { CreateAttemptDto } from './dto/create-attempt.dto.js';
import { AttemptResponseDto } from './dto/attempt-response.dto.js';

@Injectable()
export class AttemptsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionsService: QuestionsService,
    private readonly masteryService: MasteryService,
    private readonly tutorService: TutorService,
    private readonly contextBuilder: TutorContextBuilderService,
  ) {}

  async submit(dto: CreateAttemptDto): Promise<AttemptResponseDto> {
    const hintCount = dto.hintCount ?? 0;
    const question = await this.questionsService.getByIdWithAnswer(dto.questionId);
    const isCorrect = dto.selectedOption === question.correctAnswer;

    const attempt = await this.prisma.attempt.create({
      data: {
        studentId: dto.studentId,
        questionId: dto.questionId,
        studentAnswer: dto.selectedOption,
        isCorrect,
        hintCount,
      },
    });

    const updatedState = await this.masteryService.updateForAttempt({
      studentId: dto.studentId,
      skillId: question.skillId,
      isCorrect,
      difficulty: question.difficulty,
      hintCount,
    });

    const context = await this.contextBuilder.build({
      studentId: dto.studentId,
      questionId: dto.questionId,
      studentAnswer: dto.selectedOption,
      hintCount,
      tutorMode: 'initial_feedback',
      masteryOverride: updatedState.masteryProbability,
    });

    const tutor = await this.tutorService.generateInitialFeedback(context);
    const nextQuestion = await this.questionsService.getNextQuestion(dto.studentId);

    return {
      attemptId: attempt.id,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      masteryProbability: updatedState.masteryProbability,
      skillCode: question.skill.code,
      tutor,
      nextQuestion,
    };
  }
}
