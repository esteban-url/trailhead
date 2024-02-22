import type { Tenant } from '@prisma/client'

import {
  tenants,
  tenant,
  createTenant,
  updateTenant,
  deleteTenant,
} from './tenants'
import type { StandardScenario } from './tenants.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tenants', () => {
  scenario('returns all tenants', async (scenario: StandardScenario) => {
    const result = await tenants()

    expect(result.length).toEqual(Object.keys(scenario.tenant).length)
  })

  scenario('returns a single tenant', async (scenario: StandardScenario) => {
    const result = await tenant({ id: scenario.tenant.one.id })

    expect(result).toEqual(scenario.tenant.one)
  })

  scenario('creates a tenant', async () => {
    const result = await createTenant({
      input: {
        slug: 'String5101632',
        name: 'String',
        updatedAt: '2024-02-22T01:36:45.262Z',
      },
    })

    expect(result.slug).toEqual('String5101632')
    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-02-22T01:36:45.262Z'))
  })

  scenario('updates a tenant', async (scenario: StandardScenario) => {
    const original = (await tenant({ id: scenario.tenant.one.id })) as Tenant
    const result = await updateTenant({
      id: original.id,
      input: { slug: 'String53631822' },
    })

    expect(result.slug).toEqual('String53631822')
  })

  scenario('deletes a tenant', async (scenario: StandardScenario) => {
    const original = (await deleteTenant({
      id: scenario.tenant.one.id,
    })) as Tenant
    const result = await tenant({ id: original.id })

    expect(result).toEqual(null)
  })
})
