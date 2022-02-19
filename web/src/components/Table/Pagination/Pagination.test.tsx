import { render } from '@redwoodjs/testing/web'

import Pagination from './Pagination'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Pagination', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Pagination
          {...{
            previousPage: () => console.log('previousPage'),
            pageLimit: 7,
            nextPage: () => console.log('nextPage'),
            pageIndex: 3,
            pageSize: 10,
            rowsCount: 40,
            pageCount: 4,
            canPreviousPage: true,
            gotoPage: () => console.log('gotoOage'),
            canNextPage: true,
          }}
        />
      )
    }).not.toThrow()
  })
})
