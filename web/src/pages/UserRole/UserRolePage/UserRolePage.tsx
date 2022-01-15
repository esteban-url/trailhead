import UserRoleCell from 'src/components/UserRole/UserRoleCell'

type UserRolePageProps = {
  id: Int
}

const UserRolePage = ({ id }: UserRolePageProps) => {
  return <UserRoleCell id={id} />
}

export default UserRolePage
