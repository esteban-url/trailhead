import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/User/UsersCell'
import Table from 'src/components/Table/Table'

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
  return (
    <Table
      columns={columns}
      data={users}
      actions={{ onDeleteClick: onDeleteClick }}
    />
  )
}

export default UsersList
