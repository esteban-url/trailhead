import type { Prisma, TenantUser } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TenantUserCreateArgs>({
  tenantUser: {
    one: {
      data: {
        updatedAt: '2024-02-22T20:01:58.415Z',
        user: {
          create: {
            email: 'String3270991',
            name: 'String',
            updatedAt: '2024-02-22T20:01:58.415Z',
          },
        },
        tenant: {
          create: {
            slug: 'String2232461',
            name: 'String',
            updatedAt: '2024-02-22T20:01:58.415Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2024-02-22T20:01:58.415Z',
        user: {
          create: {
            email: 'String9999013',
            name: 'String',
            updatedAt: '2024-02-22T20:01:58.415Z',
          },
        },
        tenant: {
          create: {
            slug: 'String6050749',
            name: 'String',
            updatedAt: '2024-02-22T20:01:58.415Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<TenantUser, 'tenantUser'>
