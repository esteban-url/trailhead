import type { Announcement } from '@prisma/client'

import {
  announcements,
  announcement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from './announcements'
import type { StandardScenario } from './announcements.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('announcements', () => {
  scenario('returns all announcements', async (scenario: StandardScenario) => {
    const result = await announcements()

    expect(result.length).toEqual(Object.keys(scenario.announcement).length)
  })

  scenario(
    'returns a single announcement',
    async (scenario: StandardScenario) => {
      const result = await announcement({ id: scenario.announcement.one.id })

      expect(result).toEqual(scenario.announcement.one)
    }
  )

  scenario('creates a announcement', async (scenario: StandardScenario) => {
    const result = await createAnnouncement({
      input: {
        tenantId: scenario.announcement.two.tenantId,
        userId: scenario.announcement.two.userId,
        message: 'String',
        updatedAt: '2024-02-23T00:49:01.738Z',
      },
    })

    expect(result.tenantId).toEqual(scenario.announcement.two.tenantId)
    expect(result.userId).toEqual(scenario.announcement.two.userId)
    expect(result.message).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-02-23T00:49:01.738Z'))
  })

  scenario('updates a announcement', async (scenario: StandardScenario) => {
    const original = (await announcement({
      id: scenario.announcement.one.id,
    })) as Announcement
    const result = await updateAnnouncement({
      id: original.id,
      input: { message: 'String2' },
    })

    expect(result.message).toEqual('String2')
  })

  scenario('deletes a announcement', async (scenario: StandardScenario) => {
    const original = (await deleteAnnouncement({
      id: scenario.announcement.one.id,
    })) as Announcement
    const result = await announcement({ id: original.id })

    expect(result).toEqual(null)
  })
})
