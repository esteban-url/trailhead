import { render } from '@redwoodjs/testing/web'

import TopNav from './TopNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TopNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TopNav />)
    }).not.toThrow()
  })
})
