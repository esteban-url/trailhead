import type { Prisma, Announcement } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AnnouncementCreateArgs>({
  announcement: {
    one: {
      data: {
        message: 'String',
        updatedAt: '2024-02-23T00:49:01.745Z',
        user: {
          create: {
            email: 'String3296295',
            name: 'String',
            updatedAt: '2024-02-23T00:49:01.745Z',
          },
        },
        tenant: {
          create: {
            slug: 'String9714897',
            name: 'String',
            updatedAt: '2024-02-23T00:49:01.745Z',
          },
        },
      },
    },
    two: {
      data: {
        message: 'String',
        updatedAt: '2024-02-23T00:49:01.745Z',
        user: {
          create: {
            email: 'String536556',
            name: 'String',
            updatedAt: '2024-02-23T00:49:01.745Z',
          },
        },
        tenant: {
          create: {
            slug: 'String6380078',
            name: 'String',
            updatedAt: '2024-02-23T00:49:01.745Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Announcement, 'announcement'>
