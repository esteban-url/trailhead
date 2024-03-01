import type { Prisma, Tenant } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TenantCreateArgs>({
  tenant: {
    one: {
      data: {
        slug: 'String9399661',
        name: 'String',
        updatedAt: '2024-02-29T20:28:13.081Z',
      },
    },
    two: {
      data: {
        slug: 'String2011987',
        name: 'String',
        updatedAt: '2024-02-29T20:28:13.082Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Tenant, 'tenant'>
