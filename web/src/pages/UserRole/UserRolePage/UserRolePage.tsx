import UserRoleCell from 'src/components/UserRole/UserRoleCell'

type UserRolePageProps = {
  id: number
}

const UserRolePage = ({ id }: UserRolePageProps) => {
  return <UserRoleCell id={id} />
}

export default UserRolePage
