import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { id: 'String1', updatedAt: '2024-02-29T23:49:28.338Z' } },
    two: { data: { id: 'String2', updatedAt: '2024-02-29T23:49:28.338Z' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
