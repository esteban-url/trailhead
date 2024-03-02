import EditInviteCodeCell from 'src/components/app/InviteCode/EditInviteCodeCell/EditInviteCodeCell'

type InviteCodePageProps = {
  id: string
}

const EditInviteCodePage = ({ id }: InviteCodePageProps) => {
  return <EditInviteCodeCell id={id} />
}

export default EditInviteCodePage
