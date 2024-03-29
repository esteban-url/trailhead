import EditUserCell from 'src/components/app/User/EditUserCell/EditUserCell'

type UserPageProps = {
  id: string
}

const EditUserPage = ({ id }: UserPageProps) => {
  return <EditUserCell id={id} />
}

export default EditUserPage
