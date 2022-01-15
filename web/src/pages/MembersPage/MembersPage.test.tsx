import { render } from '@redwoodjs/testing/web'

import MembersPage from './MembersPage'

describe('MembersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MembersPage />)
    }).not.toThrow()
  })
})
