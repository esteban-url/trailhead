import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String7026966',
        name: 'String',
        updatedAt: '2024-02-22T01:36:11.919Z',
      },
    },
    two: {
      data: {
        email: 'String6782236',
        name: 'String',
        updatedAt: '2024-02-22T01:36:11.919Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
