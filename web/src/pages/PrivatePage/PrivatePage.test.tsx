import { render } from '@redwoodjs/testing/web'

import PrivatePage from './PrivatePage'

describe('PrivatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrivatePage />)
    }).not.toThrow()
  })
})
