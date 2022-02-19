import 'regenerator-runtime/runtime'
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table'
import { matchSorter } from 'match-sorter'
import Select from 'src/components/common/Select/Select'
import { Link, routes } from '@redwoodjs/router'
import Pagination from './Pagination/Pagination'
import NoResults from '../NoResults/NoResults'

const Table = ({ columns, data, actions }) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (
        rows: { values: unknown[] }[],
        id: string | number,
        filterValue: string
      ) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
  } = useTable(
    { columns, data, filterTypes },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  if (data)
    return (
      <>
        <div className="flex justify-between my-6">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <Select
            name="pageSizeSelect"
            label="Resuls per page:"
            defaultValue={10}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPageSize(Number(event.target.value))
            }}
          >
            {[1, 2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                {rows?.length === 0 ? (
                  <NoResults />
                ) : (
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
                                  onClick={() =>
                                    actions.onDeleteClick(row.original)
                                  }
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
                )}
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
const GlobalFilter = ({
  globalFilter,
  preGlobalFilteredRows,
  setGlobalFilter,
  ...rest
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div {...rest}>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Search
      </label>
      <div className="mt-1">
        <input
          type="search"
          name="search"
          defaultValue={value}
          id="search"
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder={`${count} item`}
        />
      </div>
    </div>
  )
}
const fuzzyTextFilterFn = (
  rows: { values: unknown[] }[],
  id: string | number,
  filterValue: string
) => {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val

export default Table
