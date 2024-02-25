import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth. Should throw when there is no current user', () => {
    // If you want to set values in context, pass it through e.g.
    // mockRedwoodDirective(requireAuth, { context: { currentUser: { id: 1, name: 'Lebron McGretzky' } }})
    const mockExecution = mockRedwoodDirective(requireAuth, { context: {} })

    expect(mockExecution).toThrowError()
  })

  it('requireAuth. Should throw not when there is a current user', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: { currentUser: { id: 1, name: 'Lebron McGretzky' } },
    })

    expect(mockExecution).not.toThrowError()
  })
})
