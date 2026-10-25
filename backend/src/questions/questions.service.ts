import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QuestionPublicDto } from './dto/question-public.dto.js';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Learning Engine: next unanswered question in fixed order, or null when all are done. */
  async getNextQuestion(studentId: string): Promise<QuestionPublicDto | null> {
    const answeredQuestionIds = (
      await this.prisma.attempt.findMany({
        where: { studentId },
        select: { questionId: true },
      })
    ).map((a) => a.questionId);

    const [next, totalQuestions] = await Promise.all([
      this.prisma.question.findFirst({
        where: { id: { notIn: answeredQuestionIds } },
        orderBy: { order: 'asc' },
        include: { skill: true },
      }),
      this.prisma.question.count(),
    ]);

    return next ? this.toPublicDto(next, totalQuestions) : null;
  }

  async getByIdWithAnswer(questionId: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: { skill: true },
    });
    if (!question) {
      throw new NotFoundException(`Question ${questionId} not found`);
    }
    return question;
  }

  private toPublicDto(
    question: Awaited<ReturnType<QuestionsService['getByIdWithAnswer']>>,
    totalQuestions: number,
  ): QuestionPublicDto {
    return {
      id: question.id,
      order: question.order,
      totalQuestions,
      skillCode: question.skill.code,
      enunciado: question.enunciado,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      difficulty: question.difficulty,
    };
  }
}
