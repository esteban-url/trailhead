import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { uuid: 'String4625126', email: 'String' } },
    two: { data: { uuid: 'String9506036', email: 'String' } },
  },
})

export type StandardScenario = typeof standard
