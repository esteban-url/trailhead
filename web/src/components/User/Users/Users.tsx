import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useTable, useSortBy, usePagination } from 'react-table'
import { QUERY } from 'src/components/User/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const DELETE_SUPABASEUSER_MUTATION = gql`
  mutation DeleteSupabaseUserMutation($uuid: String!) {
    deleteSupabaseUser(uuid: $uuid)
  }
`

const UsersList = ({ users }) => {
  const [deleteSupabaseUser] = useMutation(DELETE_SUPABASEUSER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (user) => {
    if (confirm('Are you sure you want to delete user ' + user.email + '?')) {
      deleteUser({ variables: { id: user.id } }).then(() => {
        deleteSupabaseUser({ variables: { uuid: user.uuid } })
      })
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email', // accessor is the "key" in the data
        sortType: 'basic',
      },
      {
        Header: 'Id',
        accessor: 'uuid',
        sortType: 'basic',
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
        sortType: 'basic',
      },
      {
        Header: 'Updated at',
        accessor: 'updatedAt',
        sortType: 'basic',
      },
    ],
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data: users }, useSortBy, usePagination)

  if (users)
    return (
      <>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table
                  {...getTableProps()}
                  className="min-w-full divide-y divide-gray-200"
                >
                  <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup) => (
                      <tr key="" {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            key=""
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            {column.render('Header')}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' 🔽'
                                  : ' 🔼'
                                : ''}
                            </span>
                          </th>
                        ))}
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">option</span>
                        </th>
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                      prepareRow(row)
                      return (
                        <tr
                          key=""
                          {...row.getRowProps()}
                          className={
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                key=""
                                {...cell.getCellProps()}
                                className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <nav className="rw-table-actions">
                              <Link
                                to={routes.user({ id: row.original.id })}
                                title={
                                  'Show user ' + row.original.id + ' detail'
                                }
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Show
                              </Link>
                              <Link
                                to={routes.editUser({ id: row.original.id })}
                                title={'Edit user ' + row.original.id}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                title={'Delete user ' + row.original.id}
                                className="text-red-600 hover:text-red-900"
                                onClick={() => onDeleteClick(row.original)}
                              >
                                Delete
                              </button>
                            </nav>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          {...{
            previousPage,
            nextPage,
            gotoPage,
            pageCount,
            setPageSize,
            pageIndex,
            pageSize,
            rowsCount: rows.length,
            canPreviousPage,
            canNextPage,
          }}
        />
      </>
    )
}

const Pagination = ({
  previousPage,
  nextPage,
  pageIndex,
  pageSize,
  rowsCount,
  setPageSize,
  pageCount,
  canPreviousPage,
  gotoPage,
  canNextPage,
}) => {
  const toEnd = pageCount - pageIndex - 1
  const before = pageIndex < 3 ? pageIndex : toEnd > 2 ? 2 : 4 - toEnd
  const after = Math.min(...[4 - before, toEnd])
  const PagingButton = ({ page }) => {
    return (
      <button
        onClick={() => gotoPage(page - 1)}
        aria-current="page"
        className="relative inline-flex items-center w-10 px-4 py-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
      >
        {page}
      </button>
    )
  }
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
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
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[1, 2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
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
            {[...Array(before).keys()].map((i, index, items) => (
              <PagingButton
                page={pageIndex + index - items.length + 1}
                key={'b_' + i}
              />
            ))}
            <span className="relative z-10 inline-flex items-center w-10 px-4 py-2 text-sm font-medium border text-primary-600 border-primary-500 bg-primary-50">
              {pageIndex + 1}
            </span>
            {[...Array(after).keys()].map((i, index) => (
              <PagingButton page={pageIndex + index + 2} key={'a_' + i} />
            ))}

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
          </nav>
        </div>
      </div>
    </div>
  )
}

export default UsersList
