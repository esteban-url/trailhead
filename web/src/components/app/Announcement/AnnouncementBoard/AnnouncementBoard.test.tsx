import { render } from '@redwoodjs/testing/web'

import AnnouncementBoard from './AnnouncementBoard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AnnouncementBoard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AnnouncementBoard />)
    }).not.toThrow()
  })
})
