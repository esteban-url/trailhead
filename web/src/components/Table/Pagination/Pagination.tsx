const Pagination = ({
  previousPage,
  pageLimit = 7,
  nextPage,
  pageIndex,
  pageSize,
  rowsCount,
  pageCount,
  canPreviousPage,
  gotoPage,
  canNextPage,
}) => {
  /**
   * This is the index of the last page
   * substract 1 from the page limit to use as the beakpoint index
   */
  const breakpoint: number = pageLimit - 1
  /**
   * this is the index of the middle of the page link
   */
  const middlepoint: number = Math.floor(pageLimit / 2)

  /**
   * How many pages are there until the last one
   * When there's only one page its already at the last page,
   * pageCount === 1 ? 0
   *
   * Otherwise, substract 1 from pageCount to get the index,
   * then substract the current page index (pageIndex)
   * pageCount - 1- pageIndex
   */
  const pagesToLast: number = pageCount === 1 ? 0 : pageCount - 1 - pageIndex

  /**
   * How many page links we display before the current page, up to the breakpoint eg. 4
   * if the page index is less than the middlepoint eg. 1 (2nd page),
   * pageIndex <= middlepoint
   *
   * display all the pages up to the current index
   * ? pageIndex
   *
   * otherwise, if it's pass the middlepoint
   * : pagesToLast > middlepoint
   *
   * use the middlepoint
   * ? middlepoint
   *
   * otherwise substract how many pages are until the end (pagesToLast) from the breakpoint
   * : breakpoint - pagesToLast
   */
  const before: number =
    pageIndex <= middlepoint
      ? pageIndex
      : pagesToLast > middlepoint
      ? middlepoint
      : breakpoint - pagesToLast

  /**
   * How many page links we display after the current page
   * display whatever is less between the breakpoint minus before and pagesToLast
   */
  const after: number = Math.min(breakpoint - before, pagesToLast)

  const PagingButton = ({ page }) => {
    return (
      <button
        onClick={() => gotoPage(page - 1)}
        aria-current="page"
        className="relative inline-flex items-center justify-center w-10 px-4 py-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
      >
        {page}
      </button>
    )
  }

  if (pageCount === 0) return null
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pageIndex + 1} </span> to{' '}
            <span className="font-medium">
              {pageIndex + pageSize > rowsCount ? rowsCount : pageSize}
            </span>{' '}
            of <span className="font-medium">{rowsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pageCount > 1 ? (
              <>
                <button
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                >
                  <span className="sr-only">First</span>
                  &lt; &lt;
                </button>
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  &lt;
                </button>
              </>
            ) : null}
            {[...Array(before).keys()].map((i, index, items) => (
              <PagingButton
                page={pageIndex + index - items.length + 1}
                key={'b_' + i}
              />
            ))}
            <span className="relative z-10 inline-flex items-center justify-center w-10 px-4 py-2 text-sm font-medium border text-primary-600 border-primary-500 bg-primary-50">
              {pageIndex + 1}
            </span>
            {[...Array(after).keys()].map((i, index) => (
              <PagingButton page={pageIndex + index + 2} key={'a_' + i} />
            ))}

            {pageCount > 1 ? (
              <>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  &gt;
                </button>
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                >
                  <span className="sr-only">Last</span>
                  &gt;&gt;
                </button>
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
