const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
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
   * This is the index of the last page.
   * Use the smaller number in case there are less pages (pageCount) than the page limit (pageLimit)
   */
  const breakpoint: number = Math.min(pageLimit - 1, pageCount - 1)
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
        {pageCount > 1 ? (
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <JumpButton
                onClick={() => gotoPage(0)}
                roundedLeft={true}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                &lt; &lt;
              </JumpButton>
              <JumpButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                &lt;
              </JumpButton>

              {[...Array(before).keys()].map((i, index, items) => (
                <PageButton
                  gotoPage={gotoPage}
                  page={pageIndex + index - items.length + 1}
                  key={'b_' + i}
                />
              ))}
              <CurrentPage>{pageIndex + 1}</CurrentPage>
              {[...Array(after).keys()].map((i, index) => (
                <PageButton
                  gotoPage={gotoPage}
                  page={pageIndex + index + 2}
                  key={'a_' + i}
                />
              ))}

              <JumpButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                &gt;
              </JumpButton>
              <JumpButton
                roundedRight={true}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                &gt;&gt;
              </JumpButton>
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const PageButton = ({ page, gotoPage }) => {
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

const JumpButton = ({
  children,
  className = '',
  disabled,
  onClick,
  roundedLeft = false,
  roundedRight = false,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 ',
        roundedRight ? 'rounded-r-md' : null,
        roundedLeft ? 'rounded-l-md' : null,
        disabled ? 'cursor-auto' : 'hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

const CurrentPage = ({ children }) => {
  return (
    <span className="relative z-10 inline-flex items-center justify-center w-10 px-4 py-2 text-sm font-medium border text-primary-600 border-primary-500 bg-primary-50">
      {children}
    </span>
  )
}

export default Pagination
