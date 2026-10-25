export class CreateAttemptDto {
  studentId!: string;
  questionId!: string;
  selectedOption!: 'A' | 'B' | 'C' | 'D';
  hintCount?: number;
}
