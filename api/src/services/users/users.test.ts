import type { User } from '@prisma/client'

import {
  users,
  user,
  createUser,
  updateUser,
  deleteUser,
  signUpUser,
  userWithTenants,
} from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        id: 'String',
        email: '234@8787.com',
        phone: 'String',
        username: 'Stringdsdssd',
        name: 'String',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.email).toEqual('234@8787.com')
    expect(result.phone).toEqual('String')
    expect(result.username).toEqual('Stringdsdssd')
    expect(result.name).toEqual('String')
  })

  scenario('signs up a user', async () => {
    const result = await signUpUser({
      input: {
        inviteCode: 'invitecode_id_1',
        email: 'werwer@sdf.com',
        username: 'Stringdsdssd',
        name: 'String',
      },
    })

    const user = await userWithTenants({ id: '1' })

    expect(user.tenants.length).toEqual(1)
    expect(user.tenants[0].tenantId).toEqual('tenant_id_1')

    expect(result.email).toEqual('werwer@sdf.com')
    expect(result.username).toEqual('Stringdsdssd')
    expect(result.name).toEqual('String')
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = (await user({ id: scenario.user.one.id })) as User
    const result = await updateUser({
      id: original.id,
      input: { id: 'String4' },
    })

    expect(result.id).toEqual('String4')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = (await deleteUser({ id: scenario.user.one.id })) as User
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
