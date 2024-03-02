import type { InviteCode } from '@prisma/client'

import {
  inviteCodes,
  inviteCode,
  createInviteCode,
  updateInviteCode,
  deleteInviteCode,
} from './inviteCodes'
import type { StandardScenario } from './inviteCodes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('inviteCodes', () => {
  scenario('returns all inviteCodes', async (scenario: StandardScenario) => {
    const result = await inviteCodes()

    expect(result.length).toEqual(Object.keys(scenario.inviteCode).length)
  })

  scenario(
    'returns a single inviteCode',
    async (scenario: StandardScenario) => {
      const result = await inviteCode({
        id: scenario.inviteCode.one.id,
      })

      expect(result).toEqual(scenario.inviteCode.one)
    }
  )

  scenario('creates a inviteCode', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: scenario.inviteCode.one.userId })

    const result = await createInviteCode({
      input: {
        tenantSlug: 'String4361993',
      },
    })

    expect(result.tenantId).toEqual(scenario.inviteCode.one.tenantId)
    expect(result.userId).toEqual(scenario.inviteCode.one.userId)
  })

  scenario('updates a inviteCode', async (scenario: StandardScenario) => {
    const original = (await inviteCode({
      id: scenario.inviteCode.one.id,
    })) as InviteCode
    const result = await updateInviteCode({
      id: original.id,
      input: { updatedAt: '2024-03-02T03:04:00.693Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-03-02T03:04:00.693Z'))
  })

  scenario('deletes a inviteCode', async (scenario: StandardScenario) => {
    mockCurrentUser({ id: 123 })
    const original = (await deleteInviteCode({
      id: scenario.inviteCode.one.id,
    })) as InviteCode
    const result = await inviteCode({ id: original.id })

    expect(result).toEqual(null)
  })
})
