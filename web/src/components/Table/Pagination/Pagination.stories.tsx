import Pagination from './Pagination'

export const generated = () => {
  return (
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
}

export default { title: 'Components/Pagination' }
