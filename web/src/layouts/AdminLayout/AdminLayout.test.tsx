import { render } from '@redwoodjs/testing/web'

import AdminLayout from './AdminLayout'

describe('AdminLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminLayout />)
    }).not.toThrow()
  })
})
