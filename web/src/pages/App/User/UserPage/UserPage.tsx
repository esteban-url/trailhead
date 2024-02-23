import UserCell from 'src/components/app/User/UserCell/UserCell'

type UserPageProps = {
  id: string
}

const UserPage = ({ id }: UserPageProps) => {
  return <UserCell id={id} />
}

export default UserPage
