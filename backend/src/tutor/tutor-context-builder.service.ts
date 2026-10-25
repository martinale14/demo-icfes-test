import { Injectable } from '@nestjs/common';
import { QuestionsService } from '../questions/questions.service.js';
import { MasteryService } from '../mastery/mastery.service.js';
import { KnowledgeBaseService } from '../knowledge-base/knowledge-base.service.js';
import { TutorContext } from './tutor.service.js';

@Injectable()
export class TutorContextBuilderService {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly masteryService: MasteryService,
    private readonly knowledgeBaseService: KnowledgeBaseService,
  ) {}

  async build(params: {
    studentId: string;
    questionId: string;
    studentAnswer: string;
    hintCount: number;
    tutorMode: 'initial_feedback' | 'followup';
    masteryOverride?: number;
  }): Promise<TutorContext> {
    const question = await this.questionsService.getByIdWithAnswer(params.questionId);
    const studentMastery =
      params.masteryOverride ??
      (await this.masteryService.getCurrentMastery(params.studentId, question.skillId));
    const ragSnippets = this.knowledgeBaseService.retrieve(question.skill.code);

    return {
      subject: 'ICFES Saber 11',
      skill: question.skill.name,
      learningGoal: question.skill.description,
      studentMastery,
      currentQuestion: {
        enunciado: question.enunciado,
        difficulty: question.difficulty,
        options: {
          A: question.optionA,
          B: question.optionB,
          C: question.optionC,
          D: question.optionD,
        },
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      },
      studentAnswer: params.studentAnswer,
      hintCount: params.hintCount,
      tutorMode: params.tutorMode,
      ragSnippets,
    };
  }
}
