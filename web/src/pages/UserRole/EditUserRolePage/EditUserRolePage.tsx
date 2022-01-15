import EditUserRoleCell from 'src/components/UserRole/EditUserRoleCell'

type UserRolePageProps = {
  id: number
}

const EditUserRolePage = ({ id }: UserRolePageProps) => {
  return <EditUserRoleCell id={id} />
}

export default EditUserRolePage
