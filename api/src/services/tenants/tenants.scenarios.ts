import type { Prisma, Tenant } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TenantCreateArgs>({
  tenant: {
    one: {
      data: {
        slug: 'String1347016',
        name: 'String',
        updatedAt: '2024-02-22T01:36:45.268Z',
      },
    },
    two: {
      data: {
        slug: 'String5687230',
        name: 'String',
        updatedAt: '2024-02-22T01:36:45.268Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Tenant, 'tenant'>
