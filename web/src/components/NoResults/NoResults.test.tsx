import { render } from '@redwoodjs/testing/web'

import NoResults from './NoResults'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NoResults', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NoResults />)
    }).not.toThrow()
  })
})
