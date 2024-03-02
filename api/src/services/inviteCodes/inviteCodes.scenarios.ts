import type { Prisma, InviteCode } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InviteCodeCreateArgs>({
  inviteCode: {
    one: {
      data: {
        updatedAt: '2024-03-01T03:04:00.699Z',
        tenant: {
          create: {
            slug: 'String4361993',
            name: 'String',
            updatedAt: '2024-03-01T03:04:00.699Z',
          },
        },
        user: { create: { id: '123', updatedAt: '2024-03-01T03:04:00.699Z' } },
      },
    },
    two: {
      data: {
        updatedAt: '2024-03-01T03:04:00.699Z',
        tenant: {
          create: {
            slug: 'String7464160',
            name: 'String',
            updatedAt: '2024-03-01T03:04:00.699Z',
          },
        },
        user: { create: { id: '1234', updatedAt: '2024-03-01T03:04:00.699Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<InviteCode, 'inviteCode'>
