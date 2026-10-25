import { StudentsService } from './students.service.js';

function fakePrisma(student: { id: string } | null) {
  const calls: { deleteManyArgs?: unknown; updateManyArgs?: unknown } = {};
  return {
    prisma: {
      student: {
        findUnique: async () => student,
      },
      attempt: {
        deleteMany: async (args: unknown) => {
          calls.deleteManyArgs = args;
          return { count: 0 };
        },
      },
      studentSkillState: {
        updateMany: async (args: unknown) => {
          calls.updateManyArgs = args;
          return { count: 0 };
        },
      },
    } as never,
    calls,
  };
}

describe('StudentsService.resetProgress', () => {
  it('deletes all attempts and resets skill states back to the initial prior', async () => {
    const { prisma, calls } = fakePrisma({ id: 'demo-student' });
    const service = new StudentsService(prisma);

    const result = await service.resetProgress('demo-student');

    expect(result).toEqual({ reset: true });
    expect(calls.deleteManyArgs).toEqual({ where: { studentId: 'demo-student' } });
    expect(calls.updateManyArgs).toEqual({
      where: { studentId: 'demo-student' },
      data: {
        masteryProbability: 0.3,
        consecutiveSuccesses: 0,
        hintDependency: 0,
        lastPracticedAt: null,
      },
    });
  });

  it('throws (404) instead of wiping data for a student that does not exist', async () => {
    const { prisma } = fakePrisma(null);
    const service = new StudentsService(prisma);

    await expect(service.resetProgress('ghost')).rejects.toThrow();
  });
});
