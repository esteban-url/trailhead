import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String7035630',
        name: 'String',
        updatedAt: '2024-02-22T23:57:03.515Z',
      },
    },
    two: {
      data: {
        email: 'String4636888',
        name: 'String',
        updatedAt: '2024-02-22T23:57:03.515Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
