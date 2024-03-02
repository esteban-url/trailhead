import InviteCodeCell from 'src/components/app/InviteCode/InviteCodeCell/InviteCodeCell'

type InviteCodePageProps = {
  id: string
}

const InviteCodePage = ({ id }: InviteCodePageProps) => {
  return <InviteCodeCell id={id} />
}

export default InviteCodePage
