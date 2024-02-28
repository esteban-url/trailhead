import { render } from '@redwoodjs/testing/web'

import VerifyPage from './VerifyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VerifyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VerifyPage />)
    }).not.toThrow()
  })
})
