import type { TenantUser } from '@prisma/client'

import {
  tenantUsers,
  tenantUser,
  createTenantUser,
  updateTenantUser,
  deleteTenantUser,
} from './tenantUsers'
import type { StandardScenario } from './tenantUsers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tenantUsers', () => {
  scenario('returns all tenantUsers', async (scenario: StandardScenario) => {
    const result = await tenantUsers()

    expect(result.length).toEqual(Object.keys(scenario.tenantUser).length)
  })

  scenario(
    'returns a single tenantUser',
    async (scenario: StandardScenario) => {
      const result = await tenantUser({ id: scenario.tenantUser.one.id })

      expect(result).toEqual(scenario.tenantUser.one)
    }
  )

  scenario('creates a tenantUser', async (scenario: StandardScenario) => {
    const result = await createTenantUser({
      input: {
        userId: scenario.tenantUser.two.userId,
        tenantId: scenario.tenantUser.two.tenantId,
        updatedAt: '2024-02-22T20:01:58.402Z',
      },
    })

    expect(result.userId).toEqual(scenario.tenantUser.two.userId)
    expect(result.tenantId).toEqual(scenario.tenantUser.two.tenantId)
    expect(result.updatedAt).toEqual(new Date('2024-02-22T20:01:58.402Z'))
  })

  scenario('updates a tenantUser', async (scenario: StandardScenario) => {
    const original = (await tenantUser({
      id: scenario.tenantUser.one.id,
    })) as TenantUser
    const result = await updateTenantUser({
      id: original.id,
      input: { updatedAt: '2024-02-23T20:01:58.402Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-02-23T20:01:58.402Z'))
  })

  scenario('deletes a tenantUser', async (scenario: StandardScenario) => {
    const original = (await deleteTenantUser({
      id: scenario.tenantUser.one.id,
    })) as TenantUser
    const result = await tenantUser({ id: original.id })

    expect(result).toEqual(null)
  })
})
